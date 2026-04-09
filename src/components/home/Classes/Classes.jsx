import React from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './Classes.css';
import ClassCard from '../ClassCard/ClassCard';




const Classes = () => {
const baseUrl = import.meta.env.VITE_CLOUDINARY_BASE_URL;

    const classesData = [
        {
            id: 1,
            image: 'class-1', // שם הקובץ בקלאודינרי
            category: 'STRENGTH',
            title: 'WEIGHTLIFTING',
        },
        {
            id: 2,
            image: 'class-2',
            category: 'CARDIO',
            title: 'INDOOR CYCLING',
        },
        {
            id: 3,
            image: 'class-3',
            category: 'STRENGTH',
            title: 'KETTLEBELL POWER',
        },
        {
            id: 4,
            image: 'class-4',
            category: 'CARDIO',
            title: 'INDOOR CYCLING',
        },
        {
            id: 5,
            image: 'class-5',
            category: 'TRAINING',
            title: 'BOXING',
        },
    ];

  return (
    <section className="classes-section"  id="classes">
      <div className="container">
        <div className="section-title">
          <span>OUR CLASSES</span>
          <h2>WHAT WE CAN OFFER</h2>
        </div>
        
        <div className="classes-grid">
          {classesData.map((item) => (
            <ClassCard 
            key={item.id}
            baseUrl={baseUrl}
            title={item.title}
            category={item.category}
            image={item.image}
            />
           /*  <div className="class-item" key={item.id}>
              <div className="class-image">
                <img src={`${baseUrl}${item.image}.jpg`} 
                                    alt={item.title} />
              </div>
              
           
              <div className="class-text">
                <span className="category">{item.category}</span>
                <h3>{item.title}</h3>
                <div className="class-icon">
                  <ChevronRightIcon sx={{ fontSize: 24, color: 'white' }} />
                </div>
              </div>
            </div> */
          ))}
        </div>
      </div>
    </section>
  );
};
export default Classes;