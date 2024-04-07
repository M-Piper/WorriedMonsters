import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './home.css';
import homeImage from '../images/sample.png';
import axios from "axios";

const baseURL = process.env.NODE_ENV === 'production' ? 'http://your-production-url/api' : 'http://localhost:5000/api';

const instance = axios.create({
    baseURL,
});

function Home() {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation(); // Hook to get current URL

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            instance.get('/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setUser(response.data);
                    setIsLoggedIn(true);
                })
                .catch(error => {
                    console.error('Error fetching user details:', error);
                });
        }

        // Extract username from URL query parameters
        const searchParams = new URLSearchParams(location.search);
        const usernameFromURL = searchParams.get('username');
        if (usernameFromURL) {
            // Update state with the username from URL
            setUser({ name: usernameFromURL });
            setIsLoggedIn(true);
        }
    }, [location.search]); // Listen for changes to location.search

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <div className="container">
            <div>
                {isLoggedIn && user ?
                    <h1>Welcome, {user.name}!</h1> :
                    <h1>Welcome!</h1>
                }
                {isLoggedIn &&
                    <button onClick={handleLogout}>Logout</button>
                }
                {isLoggedIn &&
                    <Link to="/library" className="library-button">Library</Link>
                }
                {!isLoggedIn &&
                    <Link to="/login" className="login-button">Login</Link>
                }
            </div>

            <div className="left-section">
                <div className="content">
                    <h1>Header</h1>
                </div>
                <img src={homeImage} alt="Image" />
                <div className="content">
                    <p>Tagline</p>
                </div>
            </div>
            <div className="right-section">
                <Link to="/monsterMaker" className="big-button">Make a Monster</Link>
            </div>
        </div>
    );
}

export default Home;
