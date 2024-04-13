import React, { useState, useEffect } from 'react';
import './library.css';
import Menu from "./menu.js";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Library() {
    const [errorMessage, setErrorMessage] = useState('');
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
                //navigate('/login');
            }
        };

        // Call the fetchMonsters function
        fetchMonsters();
    }, [navigate]);

    const removeFromLibrary = async (monstersID) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setErrorMessage('Hmmm something went wrong. Refresh your library and try again.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }
        try
        {
            // Make authenticated API call to remove monster from library using JWT
            await axios.delete('http://localhost:5000/api/removeFromLibrary',
            {monstersID}, {headers: {
                    Authorization: `Bearer ${token}`}
            });

            console.error('made it paste await axios', monstersID);
            // Remove the deleted monster from the state
            setMonsters(monsters.filter(monsters => monsters.monstersID !== monstersID));
        } catch (error) {
            console.error('Error removing monster:', error);
            console.error(monstersID);
            // Handle error
        }
    };
    return (
        <div className="library">
            <Menu />
            <h1>My Monsters</h1>
            <div className="gridcontainer">
                {monsters.map(monsters => (
                    <div key={monsters.name} className="monster-container">
                        <div className="combined-svg-container">
                         <button className="closebutton" onClick={() => removeFromLibrary(monsters.monstersID)}>X</button>
                        <div className="combined-svg" dangerouslySetInnerHTML={{ __html: monsters.combinedsvg }} />
                        <h2 className="monster-name">{monsters.name}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Library;
