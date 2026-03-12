import React from 'react';

export const CatalogRowData = ({ item }) => {
    return (
        <>
            <td style={{ fontWeight: 'bold' }}>{item.workoutName}</td>
            <td>{item.dayOfWeek}</td>
            <td>{item.time}</td>
            <td>{item.roomName}</td>
            <td>{item.maxParticipants}</td>
            <td>{item.coach?.name || 'No Coach'}</td>
        </>
    );
};