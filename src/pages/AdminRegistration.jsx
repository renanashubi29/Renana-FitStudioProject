
import React, { useState, useEffect } from 'react';
import { ManagementLayout } from '../components/admin/ManagementLayout/ManagementLayout';
import { DataTable } from '../components/admin/DataTable/DataTable';
import { FormModal } from '../components/admin/FormModal/FormModal';
import { RegistrationRowData } from '../components/admin/RegistrationRowData'; // הרכיב שיצרנו למעלה

import { 
    getAllRegistrationsApi, 
    deleteRegistrationApi, 
    createRegistrationApi 
} from '../api/registrationApi';
// בהנחה שיש לך API שמושך רשימות לבחירה במודאל
import { getAllUsersApi } from '../api/userApi';
import { getWorkoutsForThisWeekApi } from '../api/workoutsApi';

export const AdminRegistration = () => {
    const [registrations, setRegistrations] = useState([]);
    const [users, setUsers] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadData = async () => {
    setIsLoading(true);
    try {
        // 1. שליפת כל ההרשמות (Registrations)
        const allRegistrations = await getAllRegistrationsApi();

        // 2. שליפת האימונים לשבוע הקרוב (לפי הפונקציה שלך)
        const weeklyWorkouts = await getWorkoutsForThisWeekApi();

        // 3. שליפת כל המשתמשים (עבור המודאל)
        const allUsers = await getAllUsersApi();

        // --- לוגיקת הסינון ---
        
        // יצירת רשימה של ה-IDs של האימונים שמתקיימים השבוע
        const weeklyWorkoutIds = weeklyWorkouts.map(w => w._id);

        // פילטור הרישומים: נשמור רק רישום שהאימון שלו נמצא ברשימת "אימוני השבוע"
        const filteredRegistrations = allRegistrations.filter(reg => {
            // בדיקה שהרישום מכיל אובייקט אימון ושה-ID שלו קיים ברשימת השבוע
            return reg.workout && weeklyWorkoutIds.includes(reg.workout._id);
        });

        // 4. עדכון הסטייט של הקומפוננטה
        setRegistrations(filteredRegistrations);
        setWorkouts(weeklyWorkouts); // המודאל יציג רק אימונים רלוונטיים לשבוע
        setUsers(allUsers);

    } catch (err) {
        console.error("Failed to load and filter registrations:", err.message);
        alert("נכשלה טעינת הנתונים: " + err.message);
    } finally {
        setIsLoading(false);
    }
};
    useEffect(() => { loadData(); }, []);

    // הגדרת השדות עבור המודאל (הוספת רישום חדש)
    const registrationFields = [
        { 
            name: 'userId', 
            label: 'User', 
            type: 'select', 
            options: users.map(u => ({ value: u._id, label: u.name })),
            required: true 
        },
        { 
           name: 'workoutId', 
        label: 'Workout', 
        type: 'select', 
        options: workouts.map(w => {
            // הפיכת התאריך לפורמט קריא: DD/MM/YYYY
            const formattedDate = w.date 
                ? new Date(w.date).toLocaleDateString('he-IL') 
                : 'No Date';

            return { 
                value: w._id, 
                // הצגת השם, התאריך והשעה (אם קיימת)
                label: `${w.workoutName} | ${formattedDate} | ${w.time || ''}`
            };
        }),
            required: true 
        }
    ];

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this registration?')) {
            try {
                await deleteRegistrationApi(id);
                loadData();
            } catch (err) { alert(err.message); }
        }
    };

    const handleSubmit = async (formData) => {
        try {
            // במקרה של רישום, בדרך כלל יש רק יצירה (אין "עריכת" רישום קיים לרוב)
            await createRegistrationApi(formData.userId, formData.workoutId);
            setIsModalOpen(false);
            loadData();
        } catch (err) { alert(err.message); }
    };

    if (isLoading) return <div>Loading Registrations...</div>;

    return (
        <ManagementLayout 
            title="Admin Management" 
            buttonText="Add Registration" 
            onButtonClick={() => setIsModalOpen(true)}
        >
            <DataTable 
                headers={['User Name', 'Workout', 'Date', 'Time', 'Actions']}
                data={registrations}
                actions={['delete']} // רק מחיקה, בלי עריכה
                onDelete={handleDelete}
                renderRow={(item) => <RegistrationRowData item={item} />} 
            />

            <FormModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={{ userId: '', workoutId: '' }}
                title="Add New Registration"
                fields={registrationFields}
            />
        </ManagementLayout>
    );
};

export default AdminRegistration;