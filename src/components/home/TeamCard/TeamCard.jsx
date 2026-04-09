// TeamCard.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

const TeamCard = ({ name, role, img, baseUrl }) => {
 

  return (
   
                            <div className="team-card">
                                <div 
                                    className="team-img-box" 
                                    style={{ '--bg-image': `url(${baseUrl}${img}.jpg)` }}
                                >
                                    <div className="team-hover-content">
                                        <h4>{name}</h4>
                                        <span>{role}</span>
                                    </div>
                                </div>
                            </div>
                       
  );
};

export default TeamCard;