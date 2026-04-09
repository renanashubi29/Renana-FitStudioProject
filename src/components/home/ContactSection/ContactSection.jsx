import React from 'react';
import './ContactSection.css';
// ייבוא האייקונים הספציפיים מ-MUI
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import ContactCard from '../ContactCard/ContactCard';

export const ContactSection = () => {
    const contactData = [
        {
            id: 1,
            icon: <LocationOnIcon />,
            text: "333 Middle Winchendon Rd, Rindge, NH 03461",
        },
        {
            id: 2,
            icon: <PhoneIphoneIcon />,
            text: "125-711-811  |  125-668-886",
        },
        {
            id: 3,
            icon: <EmailIcon />,
            text: "Support.gymcenter@gmail.com",
        }
    ];

    return (
        <section className="contact-section"  id="contact">
            <div className="contact-container">
                {contactData.map((item) => (
                    <ContactCard
                    key={item.id} 
                        icon={item.icon} 
                        text={item.text}
                    />
                ))}
            </div>
        </section>
    );
};