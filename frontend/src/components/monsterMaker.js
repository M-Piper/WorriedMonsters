import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import refresh from '../images/refresh.svg';
import plus from '../images/plus.svg';
import download from '../images/download.svg';
import Menu from './menu.js';
import './monsterMaker.css';

function MonsterMaker({ location }) {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const [monsterParts, setMonsterParts] = useState({
        bodySVG: '',
        bodyTextureSVG:'',
        feetSVG: '',
        feetTextureSVG:'',
        armsSVG: '',
        armsTextureSVG: '',
        eyesSVG: '',
        mouthSVG: '',
        mouthTextureSVG:'',
        tailSVG: '',
        tailTextureSVG:'',
        backSVG: '',
        backTextureSVG:'',
    });

    const [colours, setColours] = useState({
        main: '',
        darker: '',
        contrast: '',
    });
    console.log('Colours:', colours); // Log the colours state
    const [monsterName, setMonsterName] = useState('');

    useEffect(() => {
        // Define an array to hold all the axios promises
        const requests = [
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/colours`),
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/body`),
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/feet`),
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/eyes`),
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/mouth`),
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/back`),
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tail`),
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/arms`),
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/randomname`),
        ];

        // Use Promise.all() to wait for all requests to complete
        Promise.all(requests)
            .then(responses => {
                // Extract data from each response
                const [coloursRes, bodyRes, feetRes, eyesRes, mouthRes, backRes, tailRes, armsRes, randomNameRes] = responses;
                // Update state with the fetched data
                setColours({
                    main: coloursRes.data.main,
                    darker: coloursRes.data.darker,
                    contrast: coloursRes.data.contrast,
                });
                setMonsterParts(prevState => ({
                    ...prevState,
                    bodySVG: bodyRes.data.bodySVG,
                    bodyTextureSVG: bodyRes.data.bodyTextureSVG,
                    feetSVG: feetRes.data.feetSVG,
                    feetTextureSVG: feetRes.data.feetTextureSVG,
                    eyesSVG: eyesRes.data.eyesSVG,
                    mouthSVG: mouthRes.data.mouthSVG,
                    mouthTextureSVG: mouthRes.data.mouthTextureSVG,
                    backSVG: backRes.data.backSVG,
                    tailSVG: tailRes.data.tailSVG,
                    tailTextureSVG: tailRes.data.tailTextureSVG,
                    armsSVG: armsRes.data.armsSVG,
                    armsTextureSVG: armsRes.data.armsTextureSVG,
                }));
                setMonsterName(randomNameRes.data.output);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const addColour = (svgString) => {
        // Check if svgString is defined
        if (!svgString) {
            return svgString;
        }
        // Check if colours state is available
        if (colours) {
            var regex = /fill:\s*none\s*;/g;
            var filledSVG = svgString.replace(regex, `fill:${colours.main};`);
            return filledSVG;
        } else {
            // If colours state is not available, return the SVG string as is
            return svgString;
        }
    };

    const addDarkerTextureColour = (svgString) => {
        // Check if svgString is defined
        if (!svgString) {
            return svgString;
        }
        // Check if darkerColour is defined
        if (colours) {
            var regex = /stroke:\s*#000\s*;/g;
            var darkerSVG = svgString.replace(regex, `stroke:${colours.darker};`);
            return darkerSVG;
        } else {
            // If darkerColour is not available, return the SVG string as is
            return svgString;
        }
    };
    const addDarkerColour = (svgString) => {
        // Check if svgString is defined
        if (!svgString) {
            return svgString;
        }

        // Check if darkerColour is defined
        if (colours) {
            var regex = /fill:\s*none\s*;/g;
            // Replace "fill:none" with "fill:[colourvariablehere]" using colours.main
            var darkerSVG = svgString.replace(regex, `fill:${colours.darker};`);

            return darkerSVG;
        } else {
            // If darkerColour is not available, return the SVG string as is
            return svgString;
        }
    };

    const addContrastColour = (svgString) => {
        // Check if svgString is defined
        if (!svgString) {
            return svgString;
        }
        // Check if contrastColour is defined
        if (colours) {
            // Replace fill:none with darkerColour
            var regex = /fill:\s*none\s*;/g;
            // Replace "fill:none" with "fill:[colourvariablehere]" using colours.main
            var contrastSVG = svgString.replace(regex, `fill:${colours.contrast};`);
            return contrastSVG;
        } else {
            // If contrastColour is not available, return the SVG string as is
            return svgString;
        }
    };


    const combineSVGs = () => {
        // Add color to each SVG part
        const colourBodySVG = addColour(monsterParts.bodySVG);
        const colourBodyTextureSVG = addDarkerTextureColour(monsterParts.bodyTextureSVG);
        const colourFeetSVG = addColour(monsterParts.feetSVG);
        const colourFeetTextureSVG = addDarkerTextureColour(monsterParts.feetTextureSVG);
        const colourArmsSVG = addColour(monsterParts.armsSVG);
        const colourArmsTextureSVG = addDarkerTextureColour(monsterParts.armsTextureSVG);
        const colourBackSVG = addContrastColour(monsterParts.backSVG);
        const colourTailSVG = addColour(monsterParts.tailSVG);
        const colourTailTextureSVG = addDarkerTextureColour(monsterParts.tailTextureSVG);
        const colourMouthSVG = addColour(monsterParts.mouthSVG);
        const colourMouthTextureSVG = addDarkerTextureColour(monsterParts.mouthTextureSVG);

        // Combine SVG parts into one SVG
        const combinedSVG = `<?xml version="1.0" encoding="utf-8"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1728 1296" style="enable-background:new 0 0 1728 1296;" xml:space="preserve">
                ${colourBodySVG}
                ${colourBodyTextureSVG}
                ${colourFeetSVG}
                ${colourFeetTextureSVG}
                ${colourArmsSVG}
                ${colourArmsTextureSVG}
                ${colourMouthSVG}
                ${colourMouthTextureSVG}
                ${colourBackSVG}
                ${colourTailSVG}
                ${colourTailTextureSVG}
                ${monsterParts.eyesSVG}
                
        </svg>
    `;
        return combinedSVG;
    };

    // Function to handle download
    const handleDownload = () => {
        const combinedSVG = combineSVGs();
        const blob = new Blob([combinedSVG], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${monsterName}.svg`; // Corrected the download filename
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };


    // Function to handle page refresh
    const handleRefresh = () => {
        // Reset the error message when generating a new monster
        setErrorMessage('');
        // Fetch new colours
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/colours`)
            .then(response => {
                setColours(prevState => ({
                    ...prevState,
                    main: response.data.main,
                    darker: response.data.darker,
                    contrast: response.data.contrast,
                }));
            })
            .catch(error => {
                console.error('Error fetching colour scheme after refresh:', error);
            });
        window.location.reload();
    };

    const handleAddToLibrary = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setErrorMessage('You must be logged in to save a monster library');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        try {
            const combinedSVG = combineSVGs();
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/saveToLibrary`,
                { combinedSVG, name: monsterName },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 201) {
                console.log('Combined SVG saved to library successfully');
                setSuccessMessage('Monster added!')
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            } else {
                throw new Error('Failed to save combined SVG to library');
            }
        } catch (error) {
            console.error('Error saving combined SVG to library:', error.message);
            setErrorMessage('Failed to add monster to library');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };


    return (
        <div className="makemonster-container">
            <Menu />

            <h1 className="makemonster-name">
                <span style={{ fontFamily: 'Varela Round, sans-serif', paddingRight: '0.75rem'}}>{monsterName.split(' ')[0]}</span>
                <span style={{ fontFamily: 'Lobster, cursive', margin: '0 0.5rem', paddingTop:'2rem' }}>{monsterName.split(' ')[1]}</span>
                <span style={{ fontFamily: 'Madimi One, cursive', paddingLeft: '0.75rem', paddingTop: '5 rem' }}>{monsterName.split(' ')[2]}</span>

            </h1>
            {/* Display error message if user is not logged in */}
            {errorMessage && <div className="errorMessage">{errorMessage}</div>}
            {successMessage && <div className="successMessage">{successMessage}</div>}
            {/* Display monster name */}
            {/* SVG container */}

            <div className="monstermaker-combined-svg-container">
                {/* Render the combined SVG */}
                <svg className="monstermaker-combined-svg" dangerouslySetInnerHTML={{ __html: combineSVGs() }} />
            </div>

            <div className="makemonster-buttons-container">
                {/* Refresh button */}
                <button onClick={handleRefresh} className="makemonster-refresh-btn">
                    <img src={refresh} alt="refresh" className="makemonster-refresh-img" />
                    <span className="makemonster-button-label">Generate New Monster</span>
                </button>

                {/* Add to library button */}
                <button onClick={handleAddToLibrary} className="makemonster-add-to-library-btn">
                    <img src={plus} alt="plus" className="makemonster-plus-img" />
                    <span className="makemonster-button-label">Add to Library</span>
                </button>

                {/* Download button */}
                <button onClick={handleDownload} className="makemonster-download-btn">
                    <img src={download} alt="download" className="makemonster-download-img" />
                    <span className="makemonster-button-label">Download Monster</span>
                </button>
            </div>
        </div>
    );
}

export default MonsterMaker;

