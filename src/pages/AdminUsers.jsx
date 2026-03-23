import React, { useState, useEffect } from 'react';
import { ManagementLayout } from '../components/admin/ManagementLayout/ManagementLayout';
import { DataTable } from '../components/admin/DataTable/DataTable';
import { UserRowData } from '../components/admin/UserRowData';
import { FormModal } from '../components/admin/FormModal/FormModal';
import { getAllUsersApi, updateUserApi, createUserApi, deleteUserApi } from '../api/userApi';
import { getAllPlansApi } from '../api/planApi';

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [plans, setPlans] = useState([]); // הוספת plans
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // טעינת נתונים (משתמשים ותוכניות)
    const loadData = async () => {
        setIsLoading(true);
        try {
            const [usersData, plansData] = await Promise.all([
                getAllUsersApi(),
                getAllPlansApi()
            ]);
            setUsers(usersData);
            setPlans(plansData);
        } catch (err) {
            console.error("Failed to load data:", err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // הגדרת השדות בצורה חכמה יותר
    const userFields = [
        { name: 'name', label: 'Full Name', required: true, gridRow: 1 },
        { name: 'email', label: 'Email', type: 'email', required: true, gridRow: 1 },
        { name: 'userName', label: 'User Name', required: true, gridRow: 2 },
        { name: 'password', label: 'Password', type: 'password', required: !selectedUser, gridRow: 2 },
        { 
            name: 'role', 
            label: 'Role', 
            type: 'select', 
            options: [
                { value: 'trainer', label: 'Trainer (Client)' },
                { value: 'coach', label: 'Coach (Staff)' },
                { value: 'admin', label: 'Admin' }
            ],
            gridRow: 3 
        },
        { name: 'phone', label: 'Phone', required: true, gridRow: 3 },
        // שדות מותנים (Conditional Fields) - נטפל בהם בתוך ה-FormModal או ע"י העברת פונקציה
        { 
            name: 'experience', 
            label: 'Experience (Years)', 
            type: 'number', 
            condition: (data) => data.role === 'coach' 
        },
        { 
            name: 'specialization', 
            label: 'Specialization', 
            condition: (data) => data.role === 'coach' 
        },
        // שדה ה-Plan שמושך נתונים מה-API
        {
            name: 'plan',
            label: 'Plan',
            type: 'select',
            options: plans.map(p => ({ value: p._id, label: `${p.name} - ₪${p.price}` })),
            required: true
        },
        // שדה מיוחד לכתובת
        { name: 'address', type: 'address-autocomplete' } ,

    ];

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteUserApi(id);
                loadData();
            } catch (err) { alert(err.message); }
        }
    };

    const handleSubmitForm = async (formData) => {
        try {
            if (selectedUser) {
                await updateUserApi(selectedUser._id, formData);
            } else {
                await createUserApi(formData);
            }
            setIsModalOpen(false);
            loadData();
        } catch (err) {
            alert("Error: " + err.message);
        }
    };
    const handleOpenEdit = (user) => {
    // 1. אנחנו שומרים את המשתמש שנבחר ב-State
    // 2. מבצעים התאמה קלה: אם ה-plan הוא אובייקט מה-DB, נחלץ רק את ה-ID
    // כדי שה-Select במודאל יזהה אותו
    const formattedUser = {
        ...user,
        plan: user.plan?._id || user.plan 
    };
    
    setSelectedUser(formattedUser);
    setIsModalOpen(true);
};

    if (isLoading) return <div>Loading...</div>;

    return (
        <ManagementLayout 
            title="User Management" 
            buttonText="+ Add New User" 
            onButtonClick={() => { setSelectedUser(null); setIsModalOpen(true); }}
        >
            <DataTable 
                headers={['Name', 'Role', 'Email', 'Contact', 'Actions']}
                data={users}
                actions={['edit', 'delete']} 
                onEdit={handleOpenEdit} 
                onDelete={handleDelete}
                renderRow={(user) => <UserRowData user={user} />} 
            />

            <FormModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitForm}
                initialData={selectedUser || { role: 'trainer', address: { city: '', street: '', houseNumber: '' } }}
                title={selectedUser ? "Edit User" : "Add New User"}
                fields={userFields}
            />
        </ManagementLayout>
    );
};
export default AdminUsers;