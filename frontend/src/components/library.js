import React, { useState, useEffect } from 'react';
import './library.css';
import Menu from "./menu.js";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Library() {
    const [monsters, setMonsters] = useState([]);
    const navigate = useNavigate();
    const { usersID } = useParams();

    useEffect(() => {
        if (!usersID) {
            console.error('User ID not found in URL');
            return;
        }

        // Fetch monsters from the API based on userID
        axios.get(`/api/library/${usersID}`)
            .then(response => {
                setMonsters(response.data);
            })
            .catch(error => {
                console.error('Error fetching monsters:', error);
            });
    }, [usersID]);

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
