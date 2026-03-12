// // import React, { useState, useEffect } from 'react';
// // import { 
// //     getAllCatalogWorkoutsApi,
// //     createCatalogWorkoutApi, 
// //     updateCatalogWorkoutApi, 
// //     deleteCatalogWorkoutApi 
// // } from '../../api/catalogWorkoutApi'; 
// // import './AdminCatalogWorkouts.css';
// // import { getAllCoachesApi } from '../../api/userApi';
// // const ROOM_CAPACITIES = {
// //     'A': 10,
// //     'B': 15,
// //     'C': 20,
// //     'D': 25
// // };

// // export const AdminCatalogWorkouts = () => {
// //     const [catalog, setCatalog] = useState([]);
// //     const [isLoading, setIsLoading] = useState(true);
// //     const [isFormOpen, setIsFormOpen] = useState(false);
// //     const [coaches, setCoaches] = useState([]);

// //     const [formData, setFormData] = useState({
// //         workoutName: '',
// //         roomName: 'A',
// //         maxParticipants: 10,
// //         dayOfWeek: 'Sunday', // שדה חדש
// //         coach:'',
// //         time: '',      // שדה חדש

// //     });
// //     const [editingId, setEditingId] = useState(null);
// // // 1. פונקציה לטעינת הקטלוג בלבד
// // const loadCatalog = async () => {
// //     try {
// //         const catalogData = await getAllCatalogWorkoutsApi();
// //         setCatalog(catalogData);
// //     } catch (err) {
// //         console.error("שגיאה בטעינת הקטלוג:", err.message);
// //     }
// // };

// // // 2. פונקציה לטעינת המאמנות בלבד
// // const loadCoaches = async () => {
// //     try {
// //         const coachesData = await getAllCoachesApi();
// //         setCoaches(coachesData);
        
// //         // בחירה אוטומטית של המאמנת הראשונה כדי למנוע את שגיאת ה-400
// //         if (coachesData.length > 0 && !formData.coach) {
// //             setFormData(prev => ({ ...prev, coach: coachesData[0]._id }));
// //         }
// //     } catch (err) {
// //         console.error("שגיאה בטעינת המאמנות:", err.message);
// //     }
// // };

// // // 3. פונקציית טעינה ראשונית שמפעילה את שתיהן במקביל
// // const loadData = async () => {
// //     setIsLoading(true);
// //     try {
// //         await Promise.all([loadCatalog(), loadCoaches()]);
// //     } finally {
// //         setIsLoading(false);
// //     }
// // };

// // useEffect(() => {
// //     loadData();
// // }, []);
// // const handleRoomChange = (e) => {
// //         const selectedRoom = e.target.value;
// //         const autoCapacity = ROOM_CAPACITIES[selectedRoom];
        
// //         setFormData({
// //             ...formData,
// //             roomName: selectedRoom,
// //             maxParticipants: autoCapacity // הקיבולת מתעדכנת אוטומטית
// //         });
    
// //     };
// //     const handleSubmit = async (e) => {
// //             console.log(formData);
// //         e.preventDefault();
// //         try {
// //             if (editingId) {
// //                 await updateCatalogWorkoutApi(editingId, formData);
// //                 alert('Workout updated successfully');
// //             } else {
// //                 await createCatalogWorkoutApi(formData);
// //                 alert('New workout added to catalog');
// //             }
// //             closeForm();
// //             loadCatalog();
// //         } catch (err) {
// //             alert('Error: ' + err.message);
// //         }
// //     };

// //     const openFormForAdd = () => {
// //         setEditingId(null);
// //         setFormData({ 
// //             workoutName: '', 
// //             roomName: 'A', 
// //             maxParticipants: 10, 
// //             dayOfWeek: 'Sunday', 
// //             coach:'',
// //             time: ''
// //         });
// //         setIsFormOpen(true);
// //     };

// //     const openFormForEdit = (item) => {
// //         setEditingId(item._id);
// //         setFormData({
// //             workoutName: item.workoutName,
// //             roomName: item.roomName,
// //             maxParticipants: item.maxParticipants,
// //             dayOfWeek: item.dayOfWeek,
// //             coach:item.coach,
// //             time: item.time || ''
// //         });
// //         setIsFormOpen(true);
// //     };

// //     const closeForm = () => {
// //         setIsFormOpen(false);
// //         setEditingId(null);
// //     };

// //     const handleDelete = async (id) => {
// //         if (window.confirm('Are you sure you want to delete this workout from the catalog?')) {
// //             try {
// //                 await deleteCatalogWorkoutApi(id);
// //                 loadCatalog();
// //             } catch (err) {
// //                 alert(err.message);
// //             }
// //         }
// //     };

// //     if (isLoading) return <div className="loading-state">Loading catalog...</div>;

// //     return (
// //         <div className="admin-container">
// //             <header className="admin-header">
// //                 <h1 className="title">Workout Catalog Management</h1>
// //                 <button className="add-main-btn" onClick={openFormForAdd}>
// //                     + Add New Workout
// //                 </button>
// //             </header>

// //             {isFormOpen && (
// //                 <div className="modal-overlay">
// //                     <div className="form-card modal-content">
// //                         <div className="modal-header">
// //                             <h3>{editingId ? 'Edit Workout' : 'Add New Workout'}</h3>
// //                             <button className="close-x-btn" onClick={closeForm}>&times;</button>
// //                         </div>
                        
// //                         <form onSubmit={handleSubmit}>
// //                                <div className="form-row">
// //                             <div className="form-group">
// //                                 <label>Workout Name</label>
// //                                 <input
// //                                     type="text"
// //                                     value={formData.workoutName}
// //                                     onChange={(e) => setFormData({...formData, workoutName: e.target.value})}
// //                                     required
// //                                 />
// //                             </div>
// //                              <div className="form-group">
// //                                     <label>Coach</label>
// //                                    <select
// //     value={formData.coach || ""}
// //     onChange={(e) => setFormData({...formData, coach: e.target.value})}
// //     required // מונע שליחת טופס ריק
// // >
// //     <option value="" disabled>Select a coach</option>
// //     {coaches.map((c) => (
// //         <option key={c._id} value={c._id}>
// //             {c.name}
// //         </option>
// //     ))}
// // </select>
// //                                 </div>
// //                             </div>

// //                             {/* שורה חדשה בטופס ליום ושעה */}
// //                             <div className="form-row">
// //                                 <div className="form-group">
// //                                     <label>Day</label>
// //                                     <select
// //                                         value={formData. dayOfWeek}
// //                                         onChange={(e) => setFormData({...formData,  dayOfWeek: e.target.value})}
// //                                     >
// //                                         <option value="Sunday">Sunday</option>
// //                                         <option value="Monday">Monday</option>
// //                                         <option value="Tuesday">Tuesday</option>
// //                                         <option value="Wednesday">Wednesday</option>
// //                                         <option value="Thursday">Thursday</option>
// //                                         <option value="Friday">Friday</option>
// //                                         <option value="Saturday">Saturday</option>
// //                                     </select>
// //                                 </div>
// //                                 <div className="form-group">
// //                                     <label>Time</label>
// //                                     <input
// //                                         type="time"
// //                                         value={formData.time}
// //                                         onChange={(e) => setFormData({...formData, time: e.target.value})}
// //                                         required
// //                                     />
// //                                 </div>
// //                             </div>
                            
// //                            <div className="form-row">
// //     <div className="form-group">
// //         <label>Room</label>
// //         <select
// //             value={formData.roomName}
// //             onChange={handleRoomChange} // קריאה לפונקציה החדשה
// //         >
// //             <option value="A">A</option>
// //             <option value="B">B</option>
// //             <option value="C">C</option>
// //             <option value="D">D</option>
// //         </select>
// //     </div>
// //     <div className="form-group">
// //         <label>Max Participants (Auto)</label>
// //         <input
// //             type="number"
// //             value={formData.maxParticipants}
// //             readOnly // השדה ננעל לעריכה ידנית
// //             className="readonly-input"
// //         />
// //     </div>
// // </div>
// //                             <div className="modal-actions">
// //                                 <button type="submit" className={`submit-btn ${editingId ? 'edit' : ''}`}>
// //                                     {editingId ? 'Update Changes' : 'Save Workout'}
// //                                 </button>
// //                                 <button type="button" onClick={closeForm} className="cancel-link">
// //                                     Cancel
// //                                 </button>
// //                             </div>
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}

// //             <div className="table">
// //                 <table>
// //                     <thead>
// //                         <tr>
// //                             <th>Workout</th>
// //                             <th>Day</th>
// //                             <th>Time</th>
// //                             <th>Room</th>
// //                             <th>Capacity</th>
// //                              <th>Coach</th>
// //                             <th>Actions</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {catalog.map((item) => (
// //                             <tr key={item._id}>
// //                                 <td style={{fontWeight: 'bold'}}>{item.workoutName}</td>
// //                                 <td>{item.dayOfWeek}</td>
// //                                 <td>{item.time}</td>
// //                                 <td>{item.roomName}</td>
// //                                 <td>{item.maxParticipants}</td>
// //                                   <td>{item.coach.name}</td>
// //                               <td>
// //     <div className="action-btns">
// //         {/* כפתור עריכה */}
// //         <button 
// //             className="action-btn edit-btn" 
// //             onClick={() => openFormForEdit(item)}
// //             title="Edit Workout"
// //         >
// //             ✏️
// //         </button>

// //         {/* כפתור מחיקה */}
// //         <button 
// //             className="action-btn delete-btn" 
// //             onClick={() => handleDelete(item._id)}
// //             title="Delete Workout"
// //         >
// //             🗑️
// //         </button>
// //     </div>
// // </td>
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </table>
// //             </div>
// //         </div>
// //     );
// // };

 // export default AdminCatalogWorkouts;
import React, { useState, useEffect } from 'react';
import { ManagementLayout } from '../../components/admin/ManagementLayout/ManagementLayout';
import { DataTable } from '../../components/admin/DataTable/DataTable';
import { FormModal } from '../../components/admin/FormModal/FormModal';
import { CatalogRowData } from '../../components/admin/CatalogRowData';

import { 
    getAllCatalogWorkoutsApi, 
    createCatalogWorkoutApi, 
    updateCatalogWorkoutApi, 
    deleteCatalogWorkoutApi 
} from '../../api/catalogWorkoutApi';
import { getAllCoachesApi } from '../../api/userApi';

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
