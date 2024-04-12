import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import homeImage from '../images/sample.png';
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
            <Link
                to={{
                    pathname: "/monsterMaker"
                }}
                className="big-button"
            >
                Make a Monster
            </Link>
        </div>
    );
}

export default Home;
