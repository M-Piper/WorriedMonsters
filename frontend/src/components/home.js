import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './home.css';
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
            const searchParams = new URLSearchParams(location.search);
            const usernameFromURL = searchParams.get('username');
            if (usernameFromURL) {
                instance.get(`/users/${usernameFromURL}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                        const { username, usersID } = response.data;
                        setUser({ name: username, usersID });
                        setIsLoggedIn(true);
                        console.log(username, usersID);
                    })
                    .catch(error => {
                        console.error('Error fetching user details:', error);
                    });
            }
        }
    }, [location.search]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
    };


    return (
        <div className="home-container">
            <div className="top-bar">
                <div className="top-left">
                    {isLoggedIn ?
                        <Link to="/library" className={`library-link ${!isLoggedIn ? 'disabled' : ''}`}><img src={library} alt="library" className="library-img" />
                            <span className="button-label">My Library</span>
                        </Link> :
                        <div className={`library-link disabled`}>
                            <img src={library} alt="library" className="homepage-library-img" />
                            <span className="homepage-button-label">My Library</span>
                        </div>
                    }
                </div>
                <div className="top-right">
                    <div className="button-container">
                    {isLoggedIn && user ?
                        <>

                            <button onClick={handleLogout} className="logout-button">Logout</button>
                            <div className="welcome-note">Welcome,</div>
                            <div className="username">{user.name}</div>
                        </> :
                        <Link to="/login" className="login-button">Login</Link>
                    }
                </div>
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
            <Link
                to={{
                    pathname: "/monsterMaker",
                    search: `?isLoggedIn=${isLoggedIn}&username=${user ? user.name : ''}&usersID=${user ? user.usersID : ''}`,
                    state: { isLoggedIn : isLoggedIn , username: user ? user.name : '', usersID: user ? user.usersID : '' }
                }}

                className="big-button"
            >
                Make a Monster
            </Link>

        </div>
    );
}

export default Home;