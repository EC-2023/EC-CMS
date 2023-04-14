import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <span className="text-muted">Florentino &copy; {new Date().getFullYear()}</span>
            </div>
        </footer>
    );
};

export default Footer;
