
import React, { useState, useEffect } from 'react';
import { ManagementLayout } from '../components/admin/ManagementLayout/ManagementLayout';
import { DataTable } from '../components/admin/DataTable/DataTable';
import { FormModal } from '../components/admin/FormModal/FormModal';
import { CatalogRowData } from '../components/admin/CatalogRowData';

import { 
    getAllCatalogWorkoutsApi, 
    createCatalogWorkoutApi, 
    updateCatalogWorkoutApi, 
    deleteCatalogWorkoutApi 
} from '../api/catalogWorkoutApi';
import { getAllCoachesApi } from '../api/userApi';

const ROOM_CAPACITIES = { 'A': 10, 'B': 15, 'C': 20, 'D': 25 };

export const AdminCatalogWorkouts = () => {
    const [catalog, setCatalog] = useState([]);
    const [coaches, setCoaches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [catalogData, coachesData] = await Promise.all([
                getAllCatalogWorkoutsApi(),
                getAllCoachesApi()
            ]);
            setCatalog(catalogData);
            setCoaches(coachesData);
        } catch (err) {
            console.error("Failed to load catalog data:", err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { loadData(); }, []);

    const catalogFields = [
        { name: 'workoutName', label: 'Workout Name', required: true },
        { 
            name: 'coach', 
            label: 'Coach', 
            type: 'select', 
            options: coaches.map(c => ({ value: c._id, label: c.name })),
            required: true 
        },
        { 
            name: 'dayOfWeek', 
            label: 'Day', 
            type: 'select', 
            options: [
                { value: 'Sunday', label: 'Sunday' },
                { value: 'Monday', label: 'Monday' },
                { value: 'Tuesday', label: 'Tuesday' },
                { value: 'Wednesday', label: 'Wednesday' },
                { value: 'Thursday', label: 'Thursday' },
                { value: 'Friday', label: 'Friday' },
                { value: 'Saturday', label: 'Saturday' }
            ]
        },
        { name: 'time', label: 'Time', type: 'time', required: true },
        { 
            name: 'roomName', 
            label: 'Room', 
            type: 'select', 
            options: Object.keys(ROOM_CAPACITIES).map(r => ({ value: r, label: r })),
            onChange: (val, formData, setFormData) => {
                setFormData({
                    ...formData,
                    roomName: val,
                    maxParticipants: ROOM_CAPACITIES[val]
                });
            }
        },
        { name: 'maxParticipants', label: 'Max Participants', type: 'number', readOnly: true }
    ];

    const handleDelete = async (id) => {
        if (window.confirm('Delete this workout from catalog?')) {
            try {
                await deleteCatalogWorkoutApi(id);
                loadData();
            } catch (err) { alert(err.message); }
        }
    };

    const handleSubmit = async (formData) => {
        try {
            if (selectedWorkout) {
                await updateCatalogWorkoutApi(selectedWorkout._id, formData);
            } else {
                await createCatalogWorkoutApi(formData);
            }
            setIsModalOpen(false);
            loadData();
        } catch (err) { alert(err.message); }
    };

    const handleOpenEdit = (item) => {
        const formatted = {
            ...item,
            coach: item.coach?._id || item.coach
        };
        setSelectedWorkout(formatted);
        setIsModalOpen(true);
    };

    if (isLoading) return <div className="loading-state">Loading Catalog...</div>;

    return (
        <ManagementLayout 
            title="Workout Catalog" 
            buttonText="+ Add Workout" 
            onButtonClick={() => { setSelectedWorkout(null); setIsModalOpen(true); }}
        >
            <DataTable 
                headers={['Workout', 'Day', 'Time', 'Room', 'Capacity', 'Coach', 'Actions']}
                data={catalog}
                actions={['edit', 'delete']}
                onEdit={handleOpenEdit}
                onDelete={handleDelete}
                renderRow={(item) => <CatalogRowData item={item} />} 
            />

            <FormModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={selectedWorkout || { roomName: 'A', maxParticipants: 10, dayOfWeek: 'Sunday' }}
                title={selectedWorkout ? "Edit Workout" : "Add to Catalog"}
                fields={catalogFields}
            />
        </ManagementLayout>
    );
};

export default AdminCatalogWorkouts;
