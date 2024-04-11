import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import refresh from '../images/refresh.svg';
import plus from '../images/plus.svg';
import download from '../images/download.svg';
import Menu from './menu.js';
import './monsterMaker.css';

function MonsterMaker({ location }) {
    const searchParams = new URLSearchParams(location.search);
    const isLoggedIn = searchParams.get('isLoggedIn') === 'true';
    const username = searchParams.get('username');
    const userID = searchParams.get('userID');
    const [monsterParts, setMonsterParts] = useState({
        bodySVG: '',
        feetSVG: '',
        armsSVG: '',
        armsTextureSVG: '',
        eyesSVG: '',
        mouthSVG: '',
        tailSVG: '',
        backSVG: '',
    });

    const [colours, setColours] = useState({
        main: '',
        darker: '',
        contrast: '',
    });

    const [monsterName, setMonsterName] = useState('');

    useEffect(() => {
        // Fetch body SVG from the database
        axios.get('http://localhost:5000/api/body')
            .then(response => {
                setMonsterParts(prevState => ({
                    ...prevState,
                    bodySVG: response.data.bodySVG,
                }));
            })
            .catch(error => {
                console.error('Error fetching body SVG:', error);
            });

        // Fetch feet SVG from the database
        axios.get('http://localhost:5000/api/feet')
            .then(response => {
                setMonsterParts(prevState => ({
                    ...prevState,
                    feetSVG: response.data.feetSVG,
                }));
            })
            .catch(error => {
                console.error('Error fetching feet SVG:', error);
            });


        // Fetch eyes SVG from the database
        axios.get('http://localhost:5000/api/eyes')
            .then(response => {
                setMonsterParts(prevState => ({
                    ...prevState,
                    eyesSVG: response.data.eyesSVG,
                }));
            })
            .catch(error => {
                console.error('Error fetching eyes SVG:', error);
            });



        // Fetch mouth SVG
        axios.get('http://localhost:5000/api/mouth')
            .then(response => {
                setMonsterParts(prevState => ({
                    ...prevState,
                    mouthSVG: response.data.mouthSVG,
                }));
            })
            .catch(error => {
                console.error('Error fetching mouth SVG:', error);
            });

        // Fetch back SVG from the database
        axios.get('http://localhost:5000/api/back')
            .then(response => {
                setMonsterParts(prevState => ({
                    ...prevState,
                    backSVG: response.data.backSVG,
                }));
            })
            .catch(error => {
                console.error('Error fetching back SVG:', error);
            });


        // Fetch tail SVG and texture SVG from the database
        axios.get('http://localhost:5000/api/tail')
            .then(response => {
                setMonsterParts(prevState => ({
                    ...prevState,
                    tailSVG: response.data.tailSVG,
                }));
            })
            .catch(error => {
                console.error('Error fetching tail SVG:', error);
            });


        // Fetch arms SVG and texture SVG from the database
        axios.get('http://localhost:5000/api/arms')
            .then(response => {
                setMonsterParts(prevState => ({
                    ...prevState,
                    armsSVG: response.data.armsSVG,
                    armsTextureSVG: response.data.armsTextureSVG,
                }));
            })
            .catch(error => {
                console.error('Error fetching arms SVG:', error);
                console.error(error.response.data)
            });


        // Fetch random monster name
        axios.get('http://localhost:5000/api/randomname')
            .then(response => {
                setMonsterName(response.data.output);
            })
            .catch(error => {
                console.error('Error fetching random name:', error);
            });

        // Fetch random colour scheme
        axios.get('http://localhost:5000/api/colours')
            .then(response => {
                setColours(prevState => ({
                    ...prevState,
                    main : response.data.main,
                    darker : response.data.darker,
                    contrast : response.data.contrast,
                }));
            })
            .catch(error => {
                console.error('Error fetching colour scheme:', error);
            });

    }, []); // Empty dependency array ensures this effect runs only once after the initial render


    const addColour = (svgString, styleName) => {
        // Check if svgString is defined
        if (!svgString) {
            return svgString;
        }

        // Check if colours state is available
        if (colours) {
            // Replace fill:none with colour
            let filledSVG = svgString.replace(/fill:none/g, `fill:${colours.main}`);
            // Replace st0 with the specified styleName
            filledSVG = filledSVG.replace(/st0/g, styleName + '0');
            filledSVG = filledSVG.replace(/st1/g, styleName + '1');
            filledSVG = filledSVG.replace(/st2/g, styleName + '2');
            return filledSVG;
        } else {
            // If colours state is not available, return the SVG string as is
            return svgString;
        }
    };

    const addDarkerColour = (svgString, styleName) => {
        // Check if svgString is defined
        if (!svgString) {
            return svgString;
        }

        // Check if darkerColour is defined
        if (colours) {
            // Replace fill:none with darkerColour
            let darkerSVG = svgString.replace(/stroke:#000000/g, `stroke:${colours.darker}`);
            // Replace st0 with the specified styleName
            darkerSVG = darkerSVG.replace(/st0/g, styleName + '0');
            darkerSVG = darkerSVG.replace(/st1/g, styleName + '1');
            darkerSVG = darkerSVG.replace(/st2/g, styleName + '2');
            return darkerSVG;
        } else {
            // If darkerColour is not available, return the SVG string as is
            return svgString;
        }
    };

    const combineSVGs = () => {
        // Add color to each SVG part
        const colourBodySVG = addColour(monsterParts.bodySVG, 'body');
        const colourFeetSVG = addColour(monsterParts.feetSVG, 'feet');
        const colourArmsSVG = addColour(monsterParts.armsSVG, 'arms');
        const colourArmsTextureSVG = addDarkerColour(monsterParts.armsTextureSVG, 'armstexture');
        const colourBackSVG = addColour(monsterParts.backSVG, 'back');
        const colourTailSVG = addColour(monsterParts.tailSVG, 'tail');

        // Combine SVG parts into one SVG
        const combinedSVG = `<?xml version="1.0" encoding="utf-8"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1728 1296" style="enable-background:new 0 0 1728 1296;" xml:space="preserve">
                ${colourBodySVG}
                ${colourFeetSVG}
                ${colourArmsSVG}
                ${colourArmsTextureSVG}
                ${monsterParts.mouthSVG}
                ${colourBackSVG}
                ${colourTailSVG}
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
        window.location.reload();
    };

    const handleAddToLibrary = async (userID, combinedSVG, name) => {
        if (!isLoggedIn) {
            throw new Error('You must register to create a monster library');
            return;
        }
        try {
            // Make API call to save combined SVG to the library
            const response = await fetch('http://localhost:5000/api/saveToLibrary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID, combinedSVG, name }),
            });

            if (!response.ok) {
                throw new Error('Failed to save combined SVG to library');
            }

            // Combined SVG saved successfully
            console.log('Combined SVG saved to library successfully');
        } catch (error) {
            console.error('Error saving combined SVG to library:', error.message);
        }
    };
        /*
          axios.post('/api/library/add', {
              monsterName: monsterName,
              combinedSVG: combinedSVG,
              userID: userID
          })
              .then(response => {
                  // Handle success
                  console.log('Monster added to library successfully');
              })
              .catch(error => {
                  // Handle error
                  console.error('Error adding monster to library:', error);
                  setError('Failed to add monster to library');
              });*/

    const handleHome = () =>{
    }
    const handleLibrary = () =>{
    }

    return (
        <div className="monster-container">
            <Menu handleHome={handleHome} handleLibrary={handleLibrary} />
            {/* Display monster name */}
            <h1 className="monster-name">
                <span style={{ fontFamily: 'Varela Round, sans-serif', paddingRight: '0.75rem'}}>{monsterName.split(' ')[0]}</span>
                <span style={{ fontFamily: 'Lobster, cursive', margin: '0 0.5rem', paddingTop:'2rem' }}>{monsterName.split(' ')[1]}</span>
                <span style={{ fontFamily: 'Madimi One, cursive', paddingLeft: '0.75rem', paddingTop: '5 rem' }}>{monsterName.split(' ')[2]}</span>
            </h1>

            {/* SVG container */}
            <div className="monstermaker-combined-svg-container">
                {/* Render the combined SVG */}
                <svg className="monstermaker-combined-svg" dangerouslySetInnerHTML={{ __html: combineSVGs() }} />
            </div>

            <div className="buttons-container">
                {/* Refresh button */}
                <button onClick={handleRefresh} className="refresh-btn">
                    <img src={refresh} alt="refresh" className="refresh-img" />
                    <span className="button-label">Generate New Monster</span>
                </button>

                {/* Add to library button */}
                <button onClick={handleAddToLibrary} className="add-to-library-btn">
                    <img src={plus} alt="plus" className="plus-img" />
                    <span className="button-label">Add to Library</span>
                </button>

                {/* Download button */}
                <button onClick={handleDownload} className="download-btn">
                    <img src={download} alt="download" className="download-img" />
                    <span className="button-label">Download Monster</span>
                </button>
            </div>
        </div>
    );
}

export default MonsterMaker;

