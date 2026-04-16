import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';

export default function Header() {
    const location = useLocation();
    const [isAdmin, setIsAdmin] = useState(false);

    // 1️⃣ Define the API URL
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

    useEffect(() => {
        // 2️⃣ Use the absolute URL to check admin status
        fetch(`${API_URL}/admin/me`, { 
            method: "GET",
            credentials: "include" 
        })
            .then(res => res.json())
            .then(data => setIsAdmin(data.logged_in))
            .catch(err => {
                // Silently fail—if the backend is down or not logged in, just don't show admin link
                setIsAdmin(false);
            });
    }, [API_URL]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Doctors', path: '/doctors' },
        { name: 'Contact us', path: '/contact' },
        // Only show this link if the backend confirms we are logged in
        ...(isAdmin ? [{ name: 'Admin Panel', path: '/Destinysec190' }] : [])
    ];

    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container-fluid d-flex justify-content-between">

                {/* Brand Logo + Name */}
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img
                        src="/images/hospital7.png" 
                        alt="Logo"
                        style={{
                            height: '40px',
                            width: '40px',
                            objectFit: 'contain',
                            marginRight: '10px'
                        }}
                    />
                    Desire Specialist Hospital
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        {navLinks.map(link => (
                            <li key={link.path} className="nav-item">
                                <Link
                                    className={`nav-link ${location.pathname === link.path ? 'active-link' : ''}`}
                                    to={link.path}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}