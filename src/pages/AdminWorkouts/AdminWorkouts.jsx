// import React, { useState, useEffect } from 'react';
// import { 
//     getWorkoutsForThisWeekApi, 
//     createWorkoutApi, 
//     updateWorkoutApi, 
//     deleteWorkoutApi 
// } from '../../api/workoutsApi'; 
// import { getAllCoachesApi } from '../../api/userApi';
// import { getAllParticipantsInWorkoutApi } from '../../api/registrationApi';
// import './AdminWorkouts.css';

// const ROOM_CAPACITIES = {
//     'A': 10,
//     'B': 15,
//     'C': 20,
//     'D': 25
// };

// export const AdminWorkouts = () => {
//     const [workouts, setWorkouts] = useState([]);
//     const [coaches, setCoaches] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isFormOpen, setIsFormOpen] = useState(false);
//     const [editingId, setEditingId] = useState(null);

//     const [formData, setFormData] = useState({
//         catalogWorkoutCode: '',
//         workoutName: '',
//         roomName: 'A',
//         maxParticipants: 10,
//         coach: '',
//         date: '',
//         time: '',
//     });

//     // 1. Load active workouts only
//     const loadWorkouts = async () => {
//         try {
//             const data = await getWorkoutsForThisWeekApi();
//             setWorkouts(data);
//         } catch (err) {
//             console.error("Error loading active workouts:", err.message);
//         }
//     };

//     // 2. Load coaches only
//     const loadCoaches = async () => {
//         try {
//             const coachesData = await getAllCoachesApi();
//             setCoaches(coachesData);
            
//             // Auto-select first coach if none selected
//             if (coachesData.length > 0 && !formData.coach) {
//                 setFormData(prev => ({ ...prev, coach: coachesData[0]._id }));
//             }
//         } catch (err) {
//             console.error("Error loading coaches:", err.message);
//         }
//     };

//     // 3. Sequential data loading (split into two calls)
//     const loadData = async () => {
//         setIsLoading(true);
//         try {
//             await loadWorkouts(); // First call
//             await loadCoaches();  // Second call
//         } catch (err) {
//             console.error("General data loading error:", err.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         loadData();
//     }, []);

//     const handleRoomChange = (e) => {
//         const selectedRoom = e.target.value;
//         setFormData({
//             ...formData,
//             roomName: selectedRoom,
//             maxParticipants: ROOM_CAPACITIES[selectedRoom]
//         });
//     };

//    const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         if (editingId) {
//             // 1. Check for registered participants before updating
//             const participants = await getAllParticipantsInWorkoutApi(editingId);
            
//             if (participants && participants.length > 0) {
//                 // 2. Validation: Ensure new capacity isn't lower than current registrations
//                 if (Number(formData.maxCapacity) < participants.length) {
//                     alert(`Update failed: There are already ${participants.length} participants registered. You cannot set capacity lower than this.`);
//                     return; // Stop the update
//                 }

//                 // 3. Optional: General warning for existing participants
//                 const confirmUpdate = window.confirm(
//                     `Note: ${participants.length} participants are already registered. Are you sure you want to save these changes?`
//                 );
//                 if (!confirmUpdate) return;
//             }

//             // 4. Proceed with update
//             await updateWorkoutApi(editingId, formData);
//             alert('Workout updated successfully');
//         } else {
//             // Logic for creating a new workout
//             await createWorkoutApi(formData);
//             alert('New active workout scheduled');
//         }
        
//         closeForm();
//         loadWorkouts();
//     } catch (err) {
//         alert('Error: ' + err.message);
//     }
// };

//     const openFormForAdd = () => {
//         setEditingId(null);
//         setFormData({ 
//             catalogWorkoutCode: '0', 
//             workoutName: '', 
//             roomName: 'A', 
//             maxParticipants: 10, 
//             coach: coaches[0]?._id || '',
//             date: '', 
//             time: ''
//         });
//         setIsFormOpen(true);
//     };

//     const openFormForEdit = (item) => {
//         setEditingId(item._id);
//         setFormData({
//             catalogWorkoutCode: item.catalogWorkoutCode,
//             workoutName: item.workoutName,
//             roomName: item.roomName,
//             maxParticipants: item.maxParticipants,
//             coach: item.coach?._id || item.coach,
//             date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
//             time: item.time || ''
//         });
//         setIsFormOpen(true);
//     };

//     const closeForm = () => {
//         setIsFormOpen(false);
//         setEditingId(null);
//     };
// const handleDelete = async (id) => {
//     try {
//         // 1. Check: Are there any participants registered for this workout?
//         const participants = await getAllParticipantsInWorkoutApi(id);
        
//         if (participants && participants.length > 0) {
//             alert(`Deletion failed: There are ${participants.length} participants registered for this workout. You must cancel their registration before deleting the workout.`);
//             return;
//         }

//         // 2. If no participants are registered, proceed with the standard confirmation
//         if (window.confirm('Are you sure you want to delete this workout?')) {
//             await deleteWorkoutApi(id);
//             loadWorkouts(); // Refresh the list
//         }
//     } catch (err) {
//         alert('Error checking registered participants: ' + err.message);
//     }
// };
//     if (isLoading) return <div className="loading-state">Loading active workouts...</div>;

//     return (
//         <div className="admin-container">
//             <header className="admin-header">
//                 <h1 className="title">Active Workouts Management</h1>
//                 <button className="add-main-btn" onClick={openFormForAdd}>
//                     + Schedule New Workout
//                 </button>
//             </header>

//             {isFormOpen && (
//                 <div className="modal-overlay">
//                     <div className="form-card modal-content">
//                         <div className="modal-header">
//                             <h3>{editingId ? 'Edit Active Workout' : 'Schedule New Workout'}</h3>
//                             <button className="close-x-btn" onClick={closeForm}>&times;</button>
//                         </div>
                        
//                         <form onSubmit={handleSubmit}>
//                             <div className="form-row">
//                                 <div className="form-group">
//                                     <label>Workout Name</label>
//                                     <input
//                                         type="text"
//                                         value={formData.workoutName}
//                                         onChange={(e) => setFormData({...formData, workoutName: e.target.value})}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Catalog Code</label>
//                                    <input
//                                     type="number"
//                                     value={formData.catalogWorkoutCode}
//                                      disabled />
//                                 </div>
//                             </div>

//                             <div className="form-row">
//                                 <div className="form-group">
//                                     <label>Date</label>
//                                     <input
//                                         type="date"
//                                         value={formData.date}
//                                         onChange={(e) => setFormData({...formData, date: e.target.value})}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Time</label>
//                                     <input
//                                         type="time"
//                                         value={formData.time}
//                                         onChange={(e) => setFormData({...formData, time: e.target.value})}
//                                         required
//                                     />
//                                 </div>
//                             </div>

//                             <div className="form-row">
//                                 <div className="form-group">
//                                     <label>Coach</label>
//                                     <select
//                                         value={formData.coach}
//                                         onChange={(e) => setFormData({...formData, coach: e.target.value})}
//                                         required
//                                     >
//                                         <option value="" disabled>Select a coach</option>
//                                         {coaches.map((c) => (
//                                             <option key={c._id} value={c._id}>{c.name}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Room</label>
//                                     <select value={formData.roomName} onChange={handleRoomChange}>
//                                         <option value="A">A</option>
//                                         <option value="B">B</option>
//                                         <option value="C">C</option>
//                                         <option value="D">D</option>
//                                     </select>
//                                 </div>
//                             </div>

//                             <div className="modal-actions">
//                                 <button type="submit" className={`submit-btn ${editingId ? 'edit' : ''}`}>
//                                     {editingId ? 'Update Workout' : 'Save Workout'}
//                                 </button>
//                                 <button type="button" onClick={closeForm} className="cancel-link">Cancel</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             <div className="table">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Workout (Code)</th>
//                             <th>Date</th>
//                             <th>Time</th>
//                             <th>Room</th>
//                             <th>Coach</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {workouts.map((item) => (
//                             <tr key={item._id}>
//                                 <td style={{fontWeight: 'bold'}}>
//                                     {item.workoutName} <small style={{color: '#666', fontSize: '0.8em'}}>#{item.catalogWorkoutCode}</small>
//                                 </td>
//                                 <td>{new Date(item.date).toLocaleDateString()}</td>
//                                 <td>{item.time}</td>
//                                 <td>{item.roomName}</td>
//                                 <td>{item.coach?.name }</td>
//                                 <td>
//                                     <div className="action-btns">
//                                         <button className="action-btn edit-btn" onClick={() => openFormForEdit(item)} title="Edit">✏️</button>
//                                         <button className="action-btn delete-btn" onClick={() => handleDelete(item._id)} title="Delete">🗑️</button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AdminWorkouts;
import React, { useState, useEffect } from 'react';
import { ManagementLayout } from '../../components/admin/ManagementLayout/ManagementLayout';
import { DataTable } from '../../components/admin/DataTable/DataTable';
import { FormModal } from '../../components/admin/FormModal/FormModal';

import { 
    getWorkoutsForThisWeekApi, 
    createWorkoutApi, 
    updateWorkoutApi, 
    deleteWorkoutApi 
} from '../../api/workoutsApi';
import { getAllCoachesApi } from '../../api/userApi';
import { getAllParticipantsInWorkoutApi } from '../../api/registrationApi';

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
                alert(`Cannot delete: ${participants.length} participants are registered.`);
                return;
            }

            if (window.confirm('Are you sure you want to delete this scheduled workout?')) {
                await deleteWorkoutApi(id);
                loadData();
            }
        } catch (err) { alert(err.message); }
    };

    const handleSubmit = async (formData) => {
        try {
            if (selectedWorkout) {
                // וולידציה של קיבולת מול רשומים בעת עדכון
                const participants = await getAllParticipantsInWorkoutApi(selectedWorkout._id);
                if (participants?.length > Number(formData.maxParticipants)) {
                    alert(`Capacity cannot be lower than the ${participants.length} current participants.`);
                    return;
                }
                await updateWorkoutApi(selectedWorkout._id, formData);
            } else {
                await createWorkoutApi(formData);
            }
            setIsModalOpen(false);
            loadData();
        } catch (err) { alert(err.message); }
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