import React, { useState, useEffect } from 'react';
import { 
    Box, Typography, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Button, Container 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // אייקון נחמד להוספה

import './AdminRegistration.css';
import { getAllRegistrationsApi, deleteRegistrationApi, createRegistrationApi } from '../../api/registrationApi';
import RegistrationRow from '../../components/admin/RegistrationRow/RegistrationRow';
import { AddRegistrationDialog } from '../../components/admin/AddRegistrationDialog/AddRegistrationDialog.jsx';


export const AdminRegistration = () => {
    const [registrations, setRegistrations] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // סטייט לניהול פתיחת החלון

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await getAllRegistrationsApi();
            setRegistrations(data);
        } catch (err) {
            console.error("Failed to load:", err);
        }
    };

    // פונקציית ההוספה שתועבר כ-Prop לחלון
    const handleAddRegistration = async (userId, workoutId) => {
        try {
            await createRegistrationApi( userId, workoutId);
            await loadData(); // רענון הטבלה לאחר הוספה מוצלחת
        } catch (err) {
            alert("Failed to add registration: " + err.message);
        }
    };

    const clickOnDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await deleteRegistrationApi(id);
            setRegistrations(registrations.filter(reg => reg._id !== id));
        } catch (err) {
            alert("Delete failed: " + err.message);
        }
    };

    return (
        <Box className="admin-page-container">
            <Container maxWidth="md">
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h3" className="admin-title">
                        Admin Management
                    </Typography>
                    
                    {/* כפתור פתיחת החלון */}
                    <Button 
                        variant="contained" 
                        color="primary" 
                        startIcon={<AddIcon />}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add Registration
                    </Button>
                </Box>

                <TableContainer component={Paper} className="registrations-table-container">
                    <Table>
                        <TableHead className="table-header">
                            <TableRow>
                                <TableCell className="header-cell">User Name</TableCell>
                                <TableCell className="header-cell">Workout</TableCell>
                                <TableCell align="center" className="header-cell">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {registrations.length > 0 ? (
                                registrations.map((reg) => (
                                   <RegistrationRow 
                                        key={reg._id} 
                                        reg={reg} 
                                        onDelete={clickOnDelete} 
                                    />
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="empty-state" align="center">
                                        No registrations found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* הקריאה לקומפוננטת החלון */}
                <AddRegistrationDialog 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    onAdd={handleAddRegistration} 
                />

            </Container>
        </Box>
    );
};

export default AdminRegistration;