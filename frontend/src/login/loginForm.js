import React, { useState } from 'react';
import './loginForm.css';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
            // Handle successful login, e.g., store token in local storage or state
            localStorage.setItem('token', data.token);
            console.log('LoginForm successful. Token:', data.token);
        } catch (error) {
            console.error('LoginForm error:', error.message);
            // Handle login error, e.g., display error message to user
        }
    };

    return (
        <div>
            <h2>Login</h2>
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
        </div>
    );
}

export default LoginForm;
