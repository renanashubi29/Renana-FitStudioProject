import React, { useState, useEffect } from 'react';
import './AddRegistrationDialog.css'; 

import { getAllUsersApi } from '../../../api/userApi';
import { getAllWorkoutsApi } from '../../../api/workoutsApi';
import { FormSelect } from '../../common/FormSelect/FormSelect';

export const AddRegistrationDialog = ({ isOpen, onClose, onAdd }) => {
    const [userId, setUserId] = useState('');
    const [workoutId, setWorkoutId] = useState('');
    const [users, setUsers] = useState([]);
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const fillOptions = async () => {
                try {
                    const usersData = await getAllUsersApi();
                    setUsers(usersData);
                    const workoutsData = await getAllWorkoutsApi();
                    setWorkouts(workoutsData);
                } catch (err) { 
                    console.error("Failed to load options:", err); 
                }
            };
            fillOptions(); 
        }
    }, [isOpen]);

    const clickOnSubmit = () => {
        if (!userId || !workoutId) return alert("Please select both a user and a workout");
        onAdd(userId, workoutId);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            {/*  מונע מהחלון להיסגר כשלוחצים בתוך התיבה הלבנה */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add New Registration</h2>
                    <button className="close-x" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <div className="form-grid">
                        <FormSelect
                            label="Select User"
                            id="user-select"
                            value={userId}
                            onChange={setUserId}
                            options={users}
                        />

                        <FormSelect 
                            label="Select Workout"
                            id="workout-select"
                            value={workoutId}
                            onChange={setWorkoutId}
                            options={workouts}
                        />
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button 
                        type="button" 
                        className="confirm-btn" 
                        onClick={clickOnSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};