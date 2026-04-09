

import { FooterColumn } from "../FooterColumn/FooterColumn";
import { GuideItemFooter } from "../GuideItemFooter/GuideItemFooter";
import { SocialLinks } from "../SocialLinks";


import './Footer.css';
export const Footer = () => {
    const usefulLinks = [
        { label: 'About', href: '#about' },
        { label: 'Blog', href: '#blog' },
        { label: 'Classes', href: '#classes' },
        { label: 'Contact', href: '#contact' },
    ];

    const supportLinks = [
        { label: 'Login', href: '#login' },
        { label: 'My account', href: '#account' },
        { label: 'Subscribe', href: '#subscribe' },
        { label: 'Contact', href: '#contact' },
    ];

    return (
        <footer className="main-footer">
            <div className="footer-container">
                
                {/* עמודת אודות */}
                <div className="footer-column about-col">
                    <div className="footer-logo">
                        <span>GYM</span><span className="logo-accent">M</span>
                    </div>
                    <p className="footer-desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <SocialLinks />
                </div>

                {/* עמודות לינקים */}
                <FooterColumn title="Useful links" links={usefulLinks} />
                <FooterColumn title="Support" links={supportLinks} />

                {/* עמודת מדריכים */}
                <div className="footer-column guides-col">
                    <h4>Tips & Guides</h4>
                    <GuideItemFooter 
                        title="Physical fitness may help prevent depression, anxiety" 
                        meta="3 min read | 20 Comments" 
                    />
                    <GuideItemFooter 
                        title="Fitness: The best exercise to lose belly fat and tone up..." 
                        meta="3 min read | 20 Comments" 
                    />
                </div>
            </div>

            <div className="footer-bottom">
                <p>Copyright ©2026 All rights reserved | This template is made with <span className="heart">❤️</span></p>
            </div>
        </footer>
    );
};