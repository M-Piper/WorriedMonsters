import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.css';
import home from '../images/home.svg';
import library from '../images/maybelibrary.svg';
import monster from '../images/library.svg';
import about from '../images/about.svg';
import menuIcon from '../images/menuIcon.svg';

const Menu = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isMobile = window.innerWidth <= 768; // Check if it's a mobile device based on window width

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const storedUsername = localStorage.getItem('username');
            setUsername(storedUsername);
        }
    }, [navigate]);

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleHome = () => {
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLibrary = () => {
        navigate('/library');
    };

    const handleRegister = () =>{
        navigate('/register');
    };

    const handleMakeMonster = () =>{
        navigate('/monsterMaker');
    };

    const handleAbout = () =>{
        navigate('/about');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <div className="menu-container">
            {/* Mobile View */}
            {isMobile ? (
                <div className={`mobile-sidebar ${sidebarOpen ? 'open' : ''}`}>
                    <div className="sidebar">
                        <button onClick={handleHome} className="sidebar-menu-button">
                            <img src={home} alt="home" className="menu-icon" />
                        </button>
                        <button onClick={handleLibrary} className={`sidebar-menu-button ${isLoggedIn ? '' : 'disabled'}`}>
                            <img src={library} alt="library" className="menu-icon" />
                        </button>
                        <button onClick={handleMakeMonster} className="sidebar-menu-button">
                            <img src={monster} alt="monster" className="menu-icon" />
                        </button>
                        <button onClick={handleAbout} className="sidebar-menu-button">
                            <img src={about} alt="about" className="menu-icon" />
                        </button>
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="sidebar-menu-button">Logout</button>
                        ) : (
                            <button onClick={handleLogin} className="sidebar-menu-button">Login</button>
                        )}
                        <button onClick={handleRegister} className="sidebar-menu-button">Register</button>
                        {isLoggedIn && (
                            <div className="welcome-message-container">
                                <span className="welcome-message">Welcome, {username}</span>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                // Desktop View
                <div className="desktop-menu">
                    <div className="mainmenu">
                        <button onClick={handleHome} className="home-button">
                            <img src={home} alt="home" className="home-img" />
                            <span className="button-label">Home</span>
                        </button>
                        <button onClick={handleLibrary} className={`library-button ${isLoggedIn ? '' : 'disabled'}`}>
                            <img src={library} alt="library" className="library-img" />
                            <span className="button-label">Monster Library</span>
                        </button>
                        <button onClick={handleMakeMonster} className={"makemonster-button"}>
                            <img src={monster} alt="monster" className="library-img" />
                            <span className="button-label">Make a Monster!</span>
                        </button>
                        <button onClick={handleAbout} className={"about-button"}>
                            <img src={about} alt="about" className="library-img" />
                            <span className="button-label">About Us</span>
                        </button>
                        <button className="blank-button"></button>
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                        ) : (
                            <button onClick={handleLogin} className="login-button">Login</button>
                        )}
                        <button onClick={handleRegister} className="register-button">Register</button>
                    </div>
                    {isLoggedIn && (
                        <div className="welcome-message-container">
                            <span className="welcome-message">Welcome, {username}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Mobile Menu Toggle */}
            {isMobile && (
                <div className="mobile-menu-toggle" onClick={handleSidebarToggle}>
                    <img src={menuIcon} alt="menu" className="menu-icon" />
                </div>
            )}
        </div>
    );
};

export default Menu;
