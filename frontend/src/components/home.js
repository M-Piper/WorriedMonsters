import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import homeImage from '../images/WynneTheUncertain.png';
import Menu from './menu.js';
const username = localStorage.getItem('username');
const userID = localStorage.getItem('userID');
const Home = () => {
    return (
        <div className="home-container">
            <Menu />
            <div className="header">
                <h1>Worried</h1>
                <h2>Monsters</h2>
                <p>by Margaret Piper</p>
            </div>

            <div className="image-container">
                <img src={homeImage} alt="Image" />
            </div>
            <div className="description">
            <p>While this website is 100% silly, it does serve one moderately serious purpose, which is to demonstrate my abilities as a fullstack developer.</p>
                <p>
                For those who are interested, here you will find:</p>
            <ul>
                <b>Frontend:</b>
            <li>React</li>
            <li>React Router DOM for client-side routing</li>
            <li>HTML/CSS</li>

                <b>Backend:</b>
            <li>Express.js to facilitate creating the backend server/handle HTTP requests</li>
            <li>Axios for HTTP requests</li>
            <li>JSON Web Token (jsonwebtoken) for authentication</li>
            <li>Body Parser to unpack json packages being sent back and forth</li>
            <li>MySQL Database</li>
            <li>Adobe Illustrator to create svg images and use snippets of that code to populate the database (the 'monster generator' creates a randomized aggregate of monster body parts)</li>
</ul>
    <p>            The source code is available on GitHub.</p>
            </div>
        </div>
    );
}

export default Home;
