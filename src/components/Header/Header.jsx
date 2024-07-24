import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CSurfer } from '../CSurfer/CSurfer';
import './Header.css';

export const Header = () => {

    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
            <div className="container">
                <a className="navbar-brand" href="/" onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                }}>
                    <span className="red">TATTO</span>SHOP
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <CSurfer path="/" content="Home" />
                        </li>
                        <li className="nav-item">
                            <CSurfer path="/services" content="Services" />
                        </li>
                        <li className="nav-item">
                            <CSurfer path="/profile" content="Profile" />
                        </li>
                        <li className="nav-item">
                            <CSurfer path="/appointments" content="Appointments" />
                        </li>
                        <li className="nav-item">
                            <CSurfer path="/login" content="Login" />
                        </li>
                        <li className="nav-item">
                            <CSurfer path="/register" content="Register" />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};