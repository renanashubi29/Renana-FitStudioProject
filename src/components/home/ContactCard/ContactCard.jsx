// ContactInfoCard.jsx
import React from 'react';

const ContactCard = ({ key,icon, text }) => {
  return (
    <div key={key} className="contact-item">
                        <div className="icon-box">
                            {icon}
                        </div>
                        <div className="contact-text">
                            <p>{ text}</p>
                        </div>
                    </div>
  );
};

export default ContactCard;