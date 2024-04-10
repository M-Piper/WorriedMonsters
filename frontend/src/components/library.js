import React from 'react';
import './library.module.css';
import sample1 from '../images/sample.png'; // Sample image imports
import sample2 from '../images/sample2.png';
import sample3 from '../images/sample3.png';
import Menu from "./menu.js";

function Library() {
    const samples = [
        { id: 1, image: sample1, title: 'Sample 1' },
        { id: 2, image: sample2, title: 'Sample 2' },
        { id: 3, image: sample3, title: 'Sample 3' }
    ];
    const handleHome = () =>{
    }
    const handleLibrary = () =>{
    }
    return (
        <div className="library">
            <Menu handleHome={handleHome} handleLibrary={handleLibrary} />
            <h1>My Monsters</h1>
            <div className="container">
                {samples.map(sample => (
                    <div key={sample.id} className="sample-container">
                        <button className="close-button">X</button>
                        <img src={sample.image} alt={sample.title} />
                        <h2>{sample.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Library;

