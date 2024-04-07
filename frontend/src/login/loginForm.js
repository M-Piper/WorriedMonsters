import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './loginForm.css';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            console.log('trying to post in front end');
            console.log('stringifying username and password:', username, password);
            const response = await fetch('http://localhost:5000/api/login', { // Specify port 5000
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
            localStorage.setItem('token', data.token);
            console.log('LoginForm successful. Token:', data.token);
            // Redirect to home page after successful login
            window.location = `/?username=${username}`; // Redirect to home page with username
        } catch (error) {
            console.error('LoginForm error:', error.message);
            setError('Invalid username or password.'); // Update error state
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <div className="error">{error}</div>} {/* Render error message */}
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
            <Link to="/register">Don't have an account? Register here.</Link> {/* Link to registration page */}
        </div>
    );
}

export default LoginForm;
