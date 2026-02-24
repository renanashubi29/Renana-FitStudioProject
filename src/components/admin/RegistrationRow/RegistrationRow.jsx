import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const RegistrationRow = ({ reg, onDelete }) => {
    return (
        <TableRow className="table-row-item">
            <TableCell>
                {reg.user?.name || "Unknown User"}
            </TableCell>
            <TableCell>
                {reg.workout?.workoutName || "General Training"}
            </TableCell>
            <TableCell align="center">
                <Button 
                    className="delete-btn"
                    variant="contained" 
                    startIcon={<DeleteIcon />}
                    onClick={() => onDelete(reg._id)}
                >
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default RegistrationRow;