import React, { useState } from 'react';
import './HomePage.css';
import Navbar from '../components/home/Navbar/Navbar';
import { Hero } from '../components/home/Hero/Hero';
import Services from '../components/home/Services/Services';
import Classes from '../components/home/Classes/Classes';
import { BannerSection } from '../components/home/BannerSection/BannerSection';
import { PricingSection } from '../components/home/PricingSection/PricingSection';
import { GallerySection } from '../components/home/GallerySection/GallerySection';
import { TeamSection } from '../components/home/TeamSection/TeamSection';
import { ContactSection } from '../components/home/ContactSection/ContactSection';
import { Footer } from '../components/home/Footer/Footer';

const HomePage = () => {

 const baseUrl = import.meta.env.VITE_CLOUDINARY_BASE_URL;
    const heroImg = "hero-1.jpg";
 
  return (
  <div className="homepage-container">
  <div className='urlImg'
  style={{ backgroundImage: `url(${baseUrl}${heroImg})` }}>
 {/*  <Navbar /> */}
  <Hero />
  </div>
      
      <Services/>
      <Classes/>
      <BannerSection/>
      <PricingSection/>
      <GallerySection/>
      <TeamSection/>
      <ContactSection/>
      <Footer/>
     </div>
  );
};

export default HomePage;