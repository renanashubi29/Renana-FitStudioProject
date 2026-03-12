import React, { useState, useEffect } from 'react';
import { 
    getAllUsersApi, 
    createUserApi, 
    updateUserApi, 
    deleteUserApi 
} from '../../api/userApi';
import { 
getAllPlansApi
} from '../../api/planApi';
import './AdminUsers.css';
import { AddressAutocomplete } from '../../components/user/AddressAutocomplete/AddressAutocomplete';

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
        const [plans, setPlans] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        userName: '',
        password: '',
        role: 'trainer', // Default role
        address: { city: '', street: '', houseNumber: '' },
        experience: 0,
        specialization: '',
        plan: ''
    });

    // 1. Fetch all users from the database
    const loadUsers = async () => {
        setIsLoading(true);
        try {
            const data = await getAllUsersApi();
            setUsers(data);
              const plansData = await getAllPlansApi();
                    setPlans(plansData);
        } catch (err) {
            console.error("Failed to load users:", err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    // 2. Handle form submission (Create or Update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("edit",formData);
            if (editingId) {
                // Update existing user
          
                await updateUserApi(editingId, formData);
                alert('User updated successfully');
            } else {
                // Create new user
                await createUserApi(formData);
                alert('User created successfully');
            }
            closeForm();
            loadUsers();
        } catch (err) {
            alert('Operation failed: ' + err.message);
        }
    };

    // 3. Delete user with confirmation
    const handleDelete = async (userId, userName) => {
        if (window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
            try {
                await deleteUserApi(userId);
                loadUsers();
            } catch (err) {
                alert('Delete failed: ' + err.message);
            }
        }
    };

    const openFormForAdd = () => {
        setEditingId(null);
        setFormData({
            name: '', email: '', phone: '', userName: '', password: '',
            role: 'trainer', address: { city: '', street: '', houseNumber: '' },
            experience: 0, specialization: '', plan: ''
        });
        setIsFormOpen(true);
    };

    const openFormForEdit = (user) => {
        console.log("user:",user);
        setEditingId(user._id);
        setFormData({
            ...user,
            password:user.password // Keep password empty for security during edits
        });
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingId(null);
    };

    if (isLoading) return <div className="loading">Loading system users...</div>;

    return (
        <div className="admin-container">
            <header className="admin-header">
                <h1>User Management</h1>
                <button className="add-main-btn" onClick={openFormForAdd}>+ Add New User</button>
            </header>

            {isFormOpen && (
                <div className="modal-overlay">
                    <div className="form-card modal-content">
                        <h3>{editingId ? 'Edit User' : 'Create New User'}</h3>
                            <div className="modal-header">
                    <h2>Add New Registration</h2>
                    <button className="close-x" onClick={() => setIsFormOpen(false)}>&times;</button>
                </div>
                        <form onSubmit={handleSubmit}>
                            {/* Basic Info */}
                            <div className="form-row">
                                <input placeholder="Full Name" name=" Full name"value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                                <input placeholder="Email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                            </div>
                              <div className="form-row">
                                <input placeholder="User Name" name=" User name" value={formData.userName} onChange={e => setFormData({...formData, userName: e.target.value})} required />
                                <input placeholder="Password"  value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
                            </div>

                            <div className="form-row">
                                <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                                    <option value="trainer">Trainer (Client)</option>
                                    <option value="coach">Coach (Staff)</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <input placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
                            </div>
                            

                            {/* Conditional Fields based on Role */}
                            {formData.role === 'coach' && (
                                <div className="form-row secondary-fields">
                                    <input placeholder="Experience (Years)" type="number" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} required />
                                    <input placeholder="Specialization" value={formData.specialization} onChange={e => setFormData({...formData, specialization: e.target.value})} required />
                                </div>
                            )}
{/* Address Section with Autocomplete */}
<div className="form-row">
    <AddressAutocomplete 
        formData={formData} 
        setFormData={setFormData} 
    />
    <div className="form-group">
                                    <label>plan</label>
                                   <select
    value={formData.plan || ""}
    onChange={(e) => setFormData({...formData, plan: e.target.value})}
    required // מונע שליחת טופס ריק
>
 <option value="" disabled>Select a plan</option>
{plans.map((c) => (
  <option key={c._id} value={c._id}>
    {`${c.name} - ₪${c.price} to ${ c.duration}`}
  </option>
))}

</select>
 </div>
</div>
  <div className="form-actions">
    <button type="submit" className="save-btn">
        {editingId ? 'Update User' : 'Save User'}
    </button>
    <button type="button" className="cancel-link" onClick={closeForm}>
        Cancel
    </button>

</div>
                        </form>
                    </div>
                </div>
            )}

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td><strong>{user.name}</strong><br/><small>{user.userName}</small></td>
                            <td><span className={`role-badge ${user.role}`}>{user.role}</span></td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                                                     <td>
    <div className="action-btns">
        <button 
            className="action-btn edit-btn" 
            onClick={() => openFormForEdit(user)} 
            title="Edit"
        >
            ✏️
        </button>
        <button 
            className="action-btn delete-btn" 
            onClick={() => handleDelete(user._id, user.name)} 
            title="Delete"
        >
            🗑️
        </button>
    </div>
</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};