import React from 'react';
import './BannerSection.css';

export const BannerSection = () => {
    const baseUrl = import.meta.env.VITE_CLOUDINARY_BASE_URL;
    const bannerImg = "banner-bg.jpg";
    return (
        <section className="banner-section set-bg"
        style={{ backgroundImage: `url(${baseUrl}${bannerImg})` }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="bs-text">
                            <h2>REGISTRATION NOW TO GET MORE DEALS</h2>
                            <div className="bt-tips">Where health, beauty and fitness meet.</div>
                            <a href="#" className="primary-btn btn-normal">Appointment</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};