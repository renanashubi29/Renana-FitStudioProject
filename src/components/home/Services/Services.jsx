 import React from 'react';
 import './Services.css';
 import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; // משקולת
 import RestaurantIcon from '@mui/icons-material/Restaurant';      // תזונה
import AssignmentIcon from '@mui/icons-material/Assignment';      // תוכנית אימונים
import FavoriteIcon from '@mui/icons-material/Favorite';          // לב

import ServiceCard from "../ServiceCard/ServiceCard";

 export const Services = () => {
  const servicesData = [
   { title: "Modern equipment", icon: <FitnessCenterIcon sx={{ fontSize: 40 }} /> ,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore facilisis."},
   { title: "Healthy nutrition plan", icon: <RestaurantIcon sx={{ fontSize: 40 }} />,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore facilisis." },
  { title: "Professional training plan", icon: <AssignmentIcon sx={{ fontSize: 40 }} /> ,
description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore facilisis."},
   { title: "Unique to your needs", icon: <FavoriteIcon sx={{ fontSize: 40 }} /> ,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore facilisis."},
 ];

   return (
     <section className="services-section" id="services">
       <div className="container">
         <div className="services-header">
           <span>WHY CHOSE US?</span>
           <h2>PUSH YOUR LIMITS FORWARD</h2>
         </div>
        
         <div className="services-grid">
           {servicesData.map((service, index) => (
            <ServiceCard
             key={index}
              title={service.title}
              icon={service.icon}
              description={service.description}
            />
            
           ))}
         </div>
       </div>
     </section>
   );
 };

 export default Services;


