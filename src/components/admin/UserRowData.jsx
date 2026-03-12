import React from 'react';

export const UserRowData = ({ user }) => {
    return (
        <>
            <td>
                <strong>{user.name}</strong>
                <br />
                <small>{user.userName}</small>
            </td>
            <td>
                <span className={`role-badge ${user.role}`}>{user.role}</span>
            </td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
           
        </>
    );
};