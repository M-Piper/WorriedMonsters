import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

function MonsterMaker() {
    const [monsterParts, setMonsterParts] = useState({
        bodySVG: '',
        bodyTextureSVG: '',
        feetSVG: '',
        feetTextureSVG: ''
    });
    const [monsterName, setMonsterName] = useState('');
    useEffect(() => {
        // Fetch body SVG and texture SVG from the database
        axios.get('http://localhost:5000/api/body')
            .then(response => {
                setMonsterParts(prevState => ({
                    ...prevState,
                    bodySVG: response.data.bodySVG,
                    bodyTextureSVG: response.data.bodyTextureSVG
                }));
            })
            .catch(error => {
                console.error('Error fetching body SVG:', error);
            });

        // Fetch feet SVG and texture SVG from the database
        axios.get('http://localhost:5000/api/feet')
            .then(response => {
                setMonsterParts(prevState => ({
                    ...prevState,
                    feetSVG: response.data.feetSVG,
                    feetTextureSVG: response.data.feetTextureSVG
                }));
            })
            .catch(error => {
                console.error('Error fetching feet SVG:', error);
            });

        //Add API calls for face, tail, back, arms


        // Fetch random monster name
        axios.get('http://localhost:5000/api/randomname')
            .then(response => {
                setMonsterName(response.data.output);
            })
            .catch(error => {
                console.error('Error fetching random name:', error);
            });

    }, []); // Empty dependency array ensures this effect runs only once after the initial render


    // Function to combine all SVG parts into one SVG string
    const removeNonSVGTags = (svgString) => {
        // Define regular expressions to match non-SVG tags
        const nonSVGTagsRegex = /<\?xml.*?\?>|<!DOCTYPE.*?>|<html.*?>|<\/html>|<body.*?>|<\/body>|<head.*?>|<\/head>/g;
        // Remove non-SVG tags from the SVG string
        return svgString.replace(nonSVGTagsRegex, '');
    };

    const combineSVGs = () => {
        // Remove non-SVG tags from each SVG string
        const sanitizedBodySVG = removeNonSVGTags(monsterParts.bodySVG);
        const sanitizedBodyTextureSVG = removeNonSVGTags(monsterParts.bodyTextureSVG);
        const sanitizedFeetSVG = removeNonSVGTags(monsterParts.feetSVG);
        const sanitizedFeetTextureSVG = removeNonSVGTags(monsterParts.feetTextureSVG);

        // Combine sanitized SVG strings into one sprite
        const combinedSVG = `
        <?xml version="1.0" encoding="UTF-8"?>
        <svg xmlns="http://www.w3.org/2000/svg">
            <!-- Body SVG -->
            <g id="body">
                ${sanitizedBodySVG}
            </g>
            <!-- Body Texture SVG -->
            <g id="body-texture">
                ${sanitizedBodyTextureSVG}
            </g>
            <!-- Feet SVG -->
            <g id="feet">
                ${sanitizedFeetSVG}
            </g>
            <!-- Feet Texture SVG -->
            <g id="feet-texture">
                ${sanitizedFeetTextureSVG}
            </g>
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
