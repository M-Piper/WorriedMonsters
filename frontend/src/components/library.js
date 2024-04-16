import React, { useState, useEffect } from 'react';
import './library.css';
import Menu from "./menu.js";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import closeIcon from '../images/close.svg';
import downloadIcon from '../images/download.svg';

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
    // Function to remove a monster from the library
    const removeFromLibrary = async (monstersID) => {
        try {
            // Get JWT token from local storage
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('JWT token not found');
            }

            // Make API call to remove the monster from the library
            await axios.delete(`http://localhost:5000/api/removeFromLibrary/${monstersID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Remove the deleted monster from the state
            setMonsters(monsters.filter(monster => monster.monstersID !== monstersID));
        } catch (error) {
            console.error('Error removing monster:', error);
            // Handle error
            setErrorMessage('Failed to remove monster from library');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    const downloadSVG = (svgContent, fileName) => {
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName + '.svg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div className="library">
            <Menu />
            <h1>My Monsters</h1>
            <div className="library-grid-container">
                {monsters.map(monsters => (
                    <div key={monsters.name} className="library-monster-container">
                        <div className="library-combined-svg-container">
                            <button className="library-close-button" onClick={() => removeFromLibrary(monsters.monstersID)}>
                                <img src={closeIcon} alt="Close" />
                            </button>
                            <button className="library-download-button" onClick={() => downloadSVG(monsters.combinedsvg, monsters.name)}>
                                <img src={downloadIcon} alt="Download" />
                            </button>
                        <div className="library-combined-svg" dangerouslySetInnerHTML={{ __html: monsters.combinedsvg }} />
                        <h2 className="library-monster-name">{monsters.name}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Library;
