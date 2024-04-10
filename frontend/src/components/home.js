import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './home.module.css';
import homeImage from '../images/sample.png';
import axios from "axios";
import library from "../images/library.svg";

const baseURL = process.env.NODE_ENV === 'production' ? 'http://your-production-url/api' : 'http://localhost:5000/api';

const instance = axios.create({
    baseURL,
});

function Home() {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

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

        const searchParams = new URLSearchParams(location.search);
        const usernameFromURL = searchParams.get('username');
        if (usernameFromURL) {
            setUser({ name: usernameFromURL });
            setIsLoggedIn(true);
        }
    }, [location.search]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <div className="container">
            <div className="top-bar">
                <div className="top-left">
                    {isLoggedIn ?
                        <Link to="/library" className={`library-link ${!isLoggedIn ? 'disabled' : ''}`}><img src={library} alt="library" className="library-img" />
                            <span className="button-label">My Library</span>
                        </Link> :
                        <div className={`library-link disabled`}>
                            <img src={library} alt="library" className="library-img" />
                            <span className="button-label">My Library</span>
                        </div>
                    }
                </div>
                <div className="top-right">
                    {isLoggedIn && user ?
                        <>

                            <button onClick={handleLogout}>Logout</button>
                            <div className="welcome-note">Welcome,</div>
                            <div className="username">{user.name}</div>
                        </> :
                        <Link to="/login">Login</Link>
                    }
                </div>
            </div>

            <div className="header">
                <h1>Worried</h1>
                <h2>Monsters</h2>
                <p>by Margaret Piper</p>
            </div>

            <div className="image-container">
                <img src={homeImage} alt="Image" />
            </div>

            <Link to="/monsterMaker" className="big-button">Make a Monster</Link>
        </div>
    );
}

export default Home;