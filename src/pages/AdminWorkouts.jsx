
import React, { useState, useEffect } from 'react';
import { ManagementLayout } from '../components/admin/ManagementLayout/ManagementLayout';
import { DataTable } from '../components/admin/DataTable/DataTable';
import { FormModal } from '../components/admin/FormModal/FormModal';

import { 
    getWorkoutsForThisWeekApi, 
    createWorkoutApi, 
    updateWorkoutApi, 
    deleteWorkoutApi 
} from '../api/workoutsApi';
import { getAllCoachesApi } from '../api/userApi';
import { getAllParticipantsInWorkoutApi } from '../api/registrationApi';
import { showStudioAlert } from '../components/studioAlert/studioAlert';

const ROOM_CAPACITIES = { 'A': 10, 'B': 15, 'C': 20, 'D': 25 };

export const AdminWorkouts = () => {
    const [workouts, setWorkouts] = useState([]);
    const [coaches, setCoaches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [workoutsData, coachesData] = await Promise.all([
                getWorkoutsForThisWeekApi(),
                getAllCoachesApi()
            ]);
            setWorkouts(workoutsData);
            setCoaches(coachesData);
        } catch (err) {
            console.error("Failed to load workouts data:", err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { loadData(); }, []);

    // הגדרת השדות עבור האימונים הפעילים
    const workoutFields = [
        { name: 'workoutName', label: 'Workout Name', required: true },
        { 
            name: 'coach', 
            label: 'Coach', 
            type: 'select', 
            options: coaches.map(c => ({ value: c._id, label: c.name })),
            required: true 
        },
        { name: 'date', label: 'Date', type: 'date', required: true },
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
        { name: 'maxParticipants', label: 'Max Participants', type: 'number', readOnly: true },
        { name: 'catalogWorkoutCode', label: 'Catalog Code', type: 'number', readOnly: true }
    ];

    const handleDelete = async (id) => {
        try {
            // בדיקת רשומים לפני מחיקה (לוגיקה ספציפית לאימונים פעילים)
            const participants = await getAllParticipantsInWorkoutApi(id);
            if (participants?.length > 0) {
               showStudioAlert(
          "Cannot Delete", 
          `This workout has ${participants.length} registered participants. Please manage registrations before deleting.`, 
          "warning"
        );
                return;
            }

         
                await deleteWorkoutApi(id);
                loadData();
                showStudioAlert(
                "Deleted!", 
                "The scheduled workout has been removed.", 
                "success"
            );
           
        } catch (err) { const errorMessage = err.response?.data?.message || err.message || "Deletion failed";
        
        showStudioAlert(
            "Error", 
            errorMessage, 
            "error"
        );}
    };

    const handleSubmit = async (formData) => {
        try {
            if (selectedWorkout) {
                // וולידציה של קיבולת מול רשומים בעת עדכון
                const participants = await getAllParticipantsInWorkoutApi(selectedWorkout._id);
                if (participants?.length > Number(formData.maxParticipants)) {
                 showStudioAlert(
        "Capacity Issue", 
        `Capacity cannot be lower than the ${participants.length} current participants already registered.`, 
        "warning"
    );
                    return;
                }
                await updateWorkoutApi(selectedWorkout._id, formData);
                showStudioAlert("Updated!", "The workout schedule has been updated.", "success");
            } else {
                await createWorkoutApi(formData);
                showStudioAlert("Created!", "The new workout has been added to the calendar.", "success");
            }
            setIsModalOpen(false);
            loadData();
        } catch (err) { const errorMessage = err.response?.data?.message || err.message || "Failed to save workout";
        
        showStudioAlert(
            "Error", 
            errorMessage, 
            "error"
        ); }
    };

    const handleOpenEdit = (item) => {
        setSelectedWorkout({
            ...item,
            coach: item.coach?._id || item.coach,
            date: item.date ? new Date(item.date).toISOString().split('T')[0] : ''
        });
        setIsModalOpen(true);
    };

    if (isLoading) return <div className="loading-state">Loading Workouts...</div>;

    return (
        <ManagementLayout 
            title="Active Workouts Management" 
            buttonText="+ Schedule Workout" 
            onButtonClick={() => { setSelectedWorkout(null); setIsModalOpen(true); }}
        >
            <DataTable 
                headers={['Workout (Code)', 'Date', 'Time', 'Room', 'Coach', 'Actions']}
                data={workouts}
                actions={['edit', 'delete']}
                onEdit={handleOpenEdit}
                onDelete={handleDelete}
                renderRow={(item) => (
                    <>
                        <td style={{fontWeight: 'bold'}}>
                            {item.workoutName} <small>#{item.catalogWorkoutCode}</small>
                        </td>
                        <td>{new Date(item.date).toLocaleDateString()}</td>
                        <td>{item.time}</td>
                        <td>{item.roomName}</td>
                        <td>{item.coach?.name}</td>
                    </>
                )} 
            />

            <FormModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={selectedWorkout || { 
        roomName: 'A', 
        maxParticipants: 10, 
        catalogWorkoutCode: 0  // הקוד יהיה 0 באימון חדש
    }}
                title={selectedWorkout ? "Edit Scheduled Workout" : "Schedule New Workout"}
                fields={workoutFields}
            />
        </ManagementLayout>
    );
};

export default AdminWorkouts;