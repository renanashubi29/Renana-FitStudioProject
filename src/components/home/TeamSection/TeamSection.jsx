import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import './TeamSection.css';

export const TeamSection = () => {
    const baseUrl = import.meta.env.VITE_CLOUDINARY_BASE_URL;
   
    const teamData = [
        { id: 1, img: 'team-1', name: 'John Doe', role: 'Expert Trainer' },
        { id: 2, img: 'team-2', name: 'Jane Smith', role: 'Yoga Instructor' },
        { id: 3, img: 'team-3', name: 'Alex Reed', role: 'Bodybuilding Coach' },
        { id: 4, img: 'team-4', name: 'Mike Ross', role: 'Fitness Coach' },
        { id: 5, img: 'team-5', name: 'Sarah Connor', role: 'Crossfit Pro' },
        { id: 6, img: 'team-6', name: 'David Goggins', role: 'Endurance Coach' },
    ];

    return (
        <section className="team-section">
            <div className="team-container">
                <div className="team-header">
                    <div className="team-titles">
                        <span className="team-subtitle">Our Team</span>
                        <h2 className="team-main-title">Train With Experts</h2>
                    </div>
                    <button className="team-appointment-btn">Appointment</button>
                </div>

                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={{ clickable: true, el: '.custom-pagination' }}
                    autoplay={{ delay: 3000 }}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                    className="team-swiper"
                >
                    {teamData.map((member) => (
                        <SwiperSlide key={member.id}>
                            <div className="team-card">
                                {/* מעבירים את ה-URL כמשתנה CSS בלבד */}
                                <div 
                                    className="team-img-box" 
                                    style={{ '--bg-image': `url(${baseUrl}${member.img}.jpg)` }}
                                >
                                    <div className="team-hover-content">
                                        <h4>{member.name}</h4>
                                        <span>{member.role}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="custom-pagination"></div>
            </div>
        </section>
    );
};