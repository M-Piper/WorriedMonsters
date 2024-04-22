import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registerForm.css';
import home from "../images/home.svg";
import Menu from "../components/menu.js";

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            // Make API call to register user
            const response = await fetch('http://54.82.71.40:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            // Registration successful

            // Redirect to home page
            navigate('/login');

            // Log user details
            console.log('User registered:', { username });

        } catch (error) {
            console.error('Registration failed:', error.message);
            setError('Something went wrong.');
            setTimeout(() => {
                // Reload the page
                window.location.reload();
            }, 3000);
        }
    };

    const handleHome = () => {
        navigate('/');
    };

    return (
        <div className="register-container">
            <Menu/>
            <h2>Register</h2>
            {error && <div className="registration-error">{error}</div>}
            <form onSubmit={handleRegister}>
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
                <div className="form-group">
                    <label>
                        Confirm Password:
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </label>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterForm;
