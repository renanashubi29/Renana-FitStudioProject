import React from 'react';
import './Services.css';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; // משקולת
import RestaurantIcon from '@mui/icons-material/Restaurant';      // תזונה
import AssignmentIcon from '@mui/icons-material/Assignment';      // תוכנית אימונים
import FavoriteIcon from '@mui/icons-material/Favorite';          // לב

export const Services = () => {
 const servicesData = [
  { title: "Modern equipment", icon: <FitnessCenterIcon sx={{ fontSize: 40 }} /> },
  { title: "Healthy nutrition plan", icon: <RestaurantIcon sx={{ fontSize: 40 }} /> },
  { title: "Professional training plan", icon: <AssignmentIcon sx={{ fontSize: 40 }} /> },
  { title: "Unique to your needs", icon: <FavoriteIcon sx={{ fontSize: 40 }} /> },
];

  return (
    <section className="services-section">
      <div className="container">
        <div className="services-header">
          <span>WHY CHOSE US?</span>
          <h2>PUSH YOUR LIMITS FORWARD</h2>
        </div>
        
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div className="service-item" key={index}>
              <div className="icon-box">
                {/* כאן תבוא התמונה מה-assets/img/services */}
                <span className="icon-placeholder">{service.icon}</span>
              </div>
              <h3>{service.title}</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore facilisis.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;