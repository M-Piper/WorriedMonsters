import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'; // Import Link component
import './loginForm.css';
import home from "../images/home.svg";

function LoginForm() {
    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            console.log('trying to post in front end');
            console.log('stringifying username and password:', username, password);
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('LoginForm failed');
                console.log('loginForm failed');
            }

            const data = await response.json();

            // Handle successful login
            //store token
            localStorage.setItem('token', data.token);
            console.log('LoginForm successful. Token:', data.token);

            // Fetch user details including userID
            const userDetailsResponse = await fetch(`http://localhost:5000/api/users/${username}`, {
                headers: {
                    Authorization: `Bearer ${data.token}`, // Include the JWT token in the request headers for authentication
                },
            });

            if (!userDetailsResponse.ok) {
                throw new Error('Failed to fetch user details');
            }

            const userDetailsData = await userDetailsResponse.json();

            // Extract userID from userDetailsData
            const usersID = userDetailsData.usersID;

            // Redirect to home page after successful login with username and userID
            window.location = `/?username=${username}&usersID=${usersID}`;
        } catch (error) {
            console.error('LoginForm error:', error.message);
            setError('Invalid username or password.'); // Update error state
        }
    };
    const handleHome = () => {
        navigate('/');
    };
    return (
        <div className="login-container">
            {/* Home button */}
            <button onClick={handleHome} className="login-home-button">
                <img src={home} alt="home" className="login-home-img" />
                <span className="button-label">Home</span>
            </button>
            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>
                        Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
            <Link to="/register">Don't have an account? Register here.</Link>
        </div>
    );

}

export default LoginForm;
