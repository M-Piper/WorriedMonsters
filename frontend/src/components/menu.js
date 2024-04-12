import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './menu.css';
import home from '../images/home.svg';
import library from '../images/library.svg';

const Menu = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Retrieve the username from local storage if the user is logged in
            const storedUsername = localStorage.getItem('username');
            setUsername(storedUsername);
        } else {
            navigate('/login'); // Redirect to login page if token is not present
        }
    }, [navigate]);

    const handleHome = () => {
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/login');
    }

    const handleLibrary = () => {
        navigate('/library');
    };

    const handleRegister = () =>{
        navigate('/register');
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // Check if token exists in localStorage
    const isLoggedIn = !!localStorage.getItem('token');


    return (
        <div className="menu">
            {/* Home icon and title */}
            <button onClick={handleHome} className="home-button">
                <img src={home} alt="home" className="home-img" />
                <span className="button-label">Home</span>
            </button>
            {/* Library button */}
            <button onClick={handleLibrary} className={`library-button ${isLoggedIn ? '' : 'disabled'}`}>
                <img src={library} alt="library" className="library-img" />
                <span className="button-label">My Library</span>
            </button>

            <button className="blank-button"></button>

            {/* Conditional rendering based on login status */}
            {isLoggedIn ? (
                <>
                <span className="welcome-message">Welcome, {username}</span>
                <button onClick={handleLogout} className="logout-button">Logout</button>
                </>
            ) : (
                <button onClick={handleLogin} className="login-button">Login</button>
            )}

            {/* Register button */}
            <button onClick={handleRegister} className="register-button">Register</button>
        </div>
    );
};

export default Menu;
