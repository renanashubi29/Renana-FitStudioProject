import React from 'react';
import './GallerySection.css';
import GalleryCard from '../GalleryCard/GalleryCard';


export const GallerySection = () => {
    // מערך הנתונים של הגלריה
const baseUrl = import.meta.env.VITE_CLOUDINARY_BASE_URL;

    // מערך הנתונים של הגלריה - שמות הקבצים כפי שהם בקלאודינרי
    const galleryData = [
        { id: 1, img: 'gallery-1', title: 'Gym Fitness', sizeClass: 'large-item' },
        { id: 2, img: 'gallery-2', title: 'Body Building', sizeClass: 'small-item' },
        { id: 3, img: 'gallery-3', title: 'Yoga & Cardio', sizeClass: 'small-item' },
        { id: 4, img: 'gallery-4', title: 'Fitness Training', sizeClass: 'small-item' },
        { id: 5, img: 'gallery-5', title: 'Weightlifting', sizeClass: 'small-item' },
        { id: 6, img: 'gallery-6', title: 'Healthy Life', sizeClass: 'large-item' },
    ];

    return (
        <section className="gallery-section">
      
    <div className="gallery-wrapper">
        {galleryData.map((item) => (
            
         <GalleryCard 
      key={item.id} 
      baseUrl={baseUrl}
      img={item.img}
      title={item.title}
      sizeClass={item.sizeClass}
    />
  
       
  ))}
    </div>
      
</section>
    );
};