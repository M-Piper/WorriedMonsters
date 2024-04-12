import React, { useState, useEffect } from 'react';
import './library.css';
import Menu from "./menu.js";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Library() {
    const [monsters, setMonsters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch monsters from the API using JWT
        const fetchMonsters = async () => {
            try {
                // Get JWT token from local storage
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('JWT token not found');
                }

                // Make authenticated API call to fetch monsters using JWT
                const response = await axios.get('http://localhost:5000/api/library', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Set monsters state with the fetched data
                setMonsters(response.data);
            } catch (error) {
                console.error('Error fetching monsters:', error);
                // Handle error or redirect to login page if unauthorized
                navigate('/login');
            }
        };

        // Call the fetchMonsters function
        fetchMonsters();
    }, [navigate]);

    const handleHome = () => {
        navigate('/');
    }

    const handleLibrary = () => {
        // No need to navigate here since we're already on the library page
    }

    return (
        <div className="library">
            <Menu handleHome={handleHome} handleLibrary={handleLibrary} />
            <h1>My Monsters</h1>
            <div className="container">
                {monsters.map(monster => (
                    <div key={monster.id} className="sample-container">
                        <button className="close-button">X</button>
                        <img src={monster.image} alt={monster.title} />
                        <h2>{monster.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Library;
