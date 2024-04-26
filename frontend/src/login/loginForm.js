import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './loginForm.css';
import Menu from "../components/menu.js";

    function LoginForm() {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
        const navigate = useNavigate();

        const handleLogin = async (e) => {
            e.preventDefault();

            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (!response.ok) {
                    throw new Error('Failed to login');
                }

                const data = await response.json();

                // Store token and user details in local storage
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                localStorage.setItem('usersID', data.usersID);

                navigate('/'); // Redirect to the home page
            } catch (error) {
                console.error('LoginForm error:', error.message);
                setError('Invalid username or password.');
            }
        };


        return (
            <div className="login-container">
                <Menu/>
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