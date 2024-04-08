import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

function MonsterMaker() {
    const [monsterParts, setMonsterParts] = useState({
        bodySVG: '',
        feetSVG: '',
        eyesSVG: '',
        mouthSVG: '',
        tailSVG: '',
        backSVG: '',
    });

    const [colours, setColours] = useState('');

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
                }));
            })
            .catch(error => {
                console.error('Error fetching arms SVG:', error);
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
                setColours(response.data.output);
            })
            .catch(error => {
                console.error('Error fetching colour scheme:', error);
            });

    }, []); // Empty dependency array ensures this effect runs only once after the initial render


    // Function to combine all SVG parts into one SVG string
    const removeNonSVGTags = (svgString) => {
        // Define regular expressions to match non-SVG tags
        const nonSVGTagsRegex = /<\?xml.*?\?>|<!DOCTYPE.*?>|<html.*?>|<\/html>|<body.*?>|<\/body>|<head.*?>|<\/head>/g;
        // Remove non-SVG tags from the SVG string

        return svgString;

    };

    const addColour = (svgString) => {
        // Check if colours state is available
        if (colours) {
            // Replace fill:none with colour
            const filledSVG = svgString.replace(/fill:none/g, `fill:${colours}`);
            return filledSVG;
        } else {
            // If colours state is not available, return the SVG string as is
            return svgString;
        }
    };
    const combineSVGs = () => {
        // Add color to each SVG part
        const colourBodySVG = addColour(monsterParts.bodySVG);
        const colourFeetSVG = addColour(monsterParts.feetSVG);
        const colourMouthSVG = addColour(monsterParts.mouthSVG);
        const colourBackSVG = addColour(monsterParts.backSVG);
        const colourArmsSVG = addColour(monsterParts.armsSVG);
        const colourTailSVG = addColour(monsterParts.tailSVG);

        // Combine SVG parts into one SVG
        const combinedSVG = `<?xml version="1.0" encoding="utf-8"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1728 1296" style="enable-background:new 0 0 1728 1296;" xml:space="preserve">
                ${colourBodySVG}
                ${colourFeetSVG}
                ${colourArmsSVG}
                ${monsterParts.eyesSVG}
                ${colourMouthSVG}
                ${colourBackSVG}
                ${colourTailSVG}
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
        a.download = 'monster.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="monster-container">
            {/* Display monster name */}
            <h1 className="monster-name">{monsterName}</h1>

            {/* Render the combined SVG */}
            <svg className="combined-svg" dangerouslySetInnerHTML={{ __html: combineSVGs() }} />

            {/* Download button */}
            <button onClick={handleDownload}>Download Monster</button>
        </div>
    );
}

export default MonsterMaker;
