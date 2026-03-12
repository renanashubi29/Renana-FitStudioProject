import React from 'react';
import { TableCell } from '@mui/material';

export const RegistrationRowData = ({ item }) => {
    // 1. חילוץ נתוני משתמש
    const userName = item.user?.name || 'Unknown User';
    
    // 2. חילוץ נתוני אימון
    const workoutName = item.workout?.workoutName || 'Workout Not Found';
    
    // 3. עיבוד תאריך קריא (יום.חודש.שנה)
    const formattedDate = item.workout?.date 
        ? new Date(item.workout.date).toLocaleDateString('he-IL') 
        : '---';

    // 4. חילוץ שעה
    const workoutTime = item.workout?.time || '---';

    return (
        <>
            <TableCell>{userName}</TableCell>
            <TableCell>
                <strong>{workoutName}</strong>
            </TableCell>
            <TableCell>{formattedDate}</TableCell>
            <TableCell>{workoutTime}</TableCell>
        </>
    );
};