import React from 'react';
import './Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-container">
                
                <div className="footer-column about-col">
                    <div className="footer-logo">
                        <span>GYM</span><span className="logo-accent">M</span>
                    </div>
                    <p className="footer-desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="footer-socials">
                        <FacebookIcon />
                        <TwitterIcon />
                        <YouTubeIcon />
                        <InstagramIcon />
                        <MailOutlineIcon />
                    </div>
                </div>

                <div className="footer-column links-col">
                    <h4>Useful links</h4>
                    <ul>
                        <li><a href="#about">About</a></li>
                        <li><a href="#blog">Blog</a></li>
                        <li><a href="#classes">Classes</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-column links-col">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="#login">Login</a></li>
                        <li><a href="#account">My account</a></li>
                        <li><a href="#subscribe">Subscribe</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>

                {/* עמודה 4: בלוג/מדריכים */}
                <div className="footer-column guides-col">
                    <h4>Tips & Guides</h4>
                    <div className="guide-item">
                        <p>Physical fitness may help prevent depression, anxiety</p>
                        <span>3 min read | 20 Comments</span>
                    </div>
                    <div className="guide-item">
                        <p>Fitness: The best exercise to lose belly fat and tone up...</p>
                        <span>3 min read | 20 Comments</span>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>Copyright ©2026 All rights reserved | This template is made with <span className="heart">❤️</span></p>
            </div>
        </footer>
    );
};