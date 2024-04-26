import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import refresh from "../images/refresh.svg";
import plus from "../images/plus.svg";
import download from "../images/download.svg";
import Menu from "./menu.js";
import "./monsterMaker.css";

function MonsterMaker({ location }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [monsterParts, setMonsterParts] = useState({
    bodySVG: "",
    bodyTextureSVG: "",
    feetSVG: "",
    feetTextureSVG: "",
    armsSVG: "",
    armsTextureSVG: "",
    eyesSVG: "",
    mouthSVG: "",
    mouthTextureSVG: "",
    tailSVG: "",
    tailTextureSVG: "",
    backSVG: "",
    backTextureSVG: "",
  });

  const [colours, setColours] = useState({
    main: "",
    darker: "",
    contrast: "",
  });
  console.log("Colours:", colours); // Log the colours state
  const [monsterName, setMonsterName] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((r) => r.text())
      .then((response) => console.log(1234, response));
  }, []);

  // useEffect(() => {

  //     // Fetch random colour scheme
  //     axios.get(`${process.env.REACT_APP_BACKEND_URL}/colours`)
  //         .then(response => {
  //             setColours(prevState => ({
  //                 ...prevState,
  //                 main : response.data.main,
  //                 darker : response.data.darker,
  //                 contrast : response.data.contrast,
  //             }));
  //         })
  //         .catch(error => {
  //             console.error('Error fetching colour scheme:', error);
  //         });

  //     // Fetch body SVG from the database
  //     axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/body`)
  //         .then(response => {
  //             setMonsterParts(prevState => ({
  //                 ...prevState,
  //                 bodySVG: response.data.bodySVG,
  //                 bodyTextureSVG: response.data.bodyTextureSVG,
  //             }));
  //         })
  //         .catch(error => {
  //             console.error('Error fetching body SVG:', error);
  //         });

  //     // Fetch feet SVG from the database
  //     axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/feet`)
  //         .then(response => {
  //             setMonsterParts(prevState => ({
  //                 ...prevState,
  //                 feetSVG: response.data.feetSVG,
  //                 feetTextureSVG: response.data.feetTextureSVG,
  //             }));
  //         })
  //         .catch(error => {
  //             console.error('Error fetching feet SVG:', error);
  //         });

  //     // Fetch eyes SVG from the database
  //     axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/eyes`)
  //         .then(response => {
  //             setMonsterParts(prevState => ({
  //                 ...prevState,
  //                 eyesSVG: response.data.eyesSVG,
  //             }));
  //         })
  //         .catch(error => {
  //             console.error('Error fetching eyes SVG:', error);
  //         });

  //     // Fetch mouth SVG
  //     axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/mouth`)
  //         .then(response => {
  //             setMonsterParts(prevState => ({
  //                 ...prevState,
  //                 mouthSVG: response.data.mouthSVG,
  //                 mouthTextureSVG: response.data.mouthTextureSVG,
  //             }));
  //         })
  //         .catch(error => {
  //             console.error('Error fetching mouth SVG:', error);
  //         });

  //     // Fetch back SVG from the database
  //     axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/back`)
  //         .then(response => {
  //             setMonsterParts(prevState => ({
  //                 ...prevState,
  //                 backSVG: response.data.backSVG,
  //             }));
  //         })
  //         .catch(error => {
  //             console.error('Error fetching back SVG:', error);
  //         });

  //     // Fetch tail SVG and texture SVG from the database
  //     axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tail`)
  //         .then(response => {
  //             setMonsterParts(prevState => ({
  //                 ...prevState,
  //                 tailSVG: response.data.tailSVG,
  //                 tailTextureSVG: response.data.tailTextureSVG,
  //             }));
  //         })
  //         .catch(error => {
  //             console.error('Error fetching tail SVG:', error);
  //         });

  //     // Fetch arms SVG and texture SVG from the database
  //     axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/arms`)
  //         .then(response => {
  //             setMonsterParts(prevState => ({
  //                 ...prevState,
  //                 armsSVG: response.data.armsSVG,
  //                 armsTextureSVG: response.data.armsTextureSVG,
  //             }));
  //         })
  //         .catch(error => {
  //             console.error('Error fetching arms SVG:', error);
  //             console.error(error.response.data)
  //         });

  //     // Fetch random monster name
  //     axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/randomname`)
  //         .then(response => {
  //             setMonsterName(response.data.output);
  //         })
  //         .catch(error => {
  //             console.error('Error fetching random name:', error);
  //         });

  // }, []); // Empty dependency array ensures this effect runs only once after the initial render

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
    const colourBodyTextureSVG = addDarkerTextureColour(
      monsterParts.bodyTextureSVG
    );
    const colourFeetSVG = addColour(monsterParts.feetSVG);
    const colourFeetTextureSVG = addDarkerTextureColour(
      monsterParts.feetTextureSVG
    );
    const colourArmsSVG = addColour(monsterParts.armsSVG);
    const colourArmsTextureSVG = addDarkerTextureColour(
      monsterParts.armsTextureSVG
    );
    const colourBackSVG = addContrastColour(monsterParts.backSVG);
    const colourTailSVG = addColour(monsterParts.tailSVG);
    const colourTailTextureSVG = addDarkerTextureColour(
      monsterParts.tailTextureSVG
    );
    const colourMouthSVG = addColour(monsterParts.mouthSVG);
    const colourMouthTextureSVG = addDarkerTextureColour(
      monsterParts.mouthTextureSVG
    );

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
    const blob = new Blob([combinedSVG], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
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
    setErrorMessage("");
    // Fetch new colours
    axios
      .get("http://localhost:5000/api/colours")
      .then((response) => {
        setColours((prevState) => ({
          ...prevState,
          main: response.data.main,
          darker: response.data.darker,
          contrast: response.data.contrast,
        }));
      })
      .catch((error) => {
        console.error("Error fetching colour scheme after refresh:", error);
      });
    window.location.reload();
  };

  const handleAddToLibrary = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("You must be logged in to save a monster library");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    try {
      const combinedSVG = combineSVGs();
      const response = await axios.post(
        "http://localhost:5000/api/saveToLibrary",
        { combinedSVG, name: monsterName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        console.log("Combined SVG saved to library successfully");
        setSuccessMessage("Monster added!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        throw new Error("Failed to save combined SVG to library");
      }
    } catch (error) {
      console.error("Error saving combined SVG to library:", error.message);
      setErrorMessage("Failed to add monster to library");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="makemonster-container">
      <Menu />

      <h1 className="makemonster-name">
        <span
          style={{
            fontFamily: "Varela Round, sans-serif",
            paddingRight: "0.75rem",
          }}
        >
          {monsterName.split(" ")[0]}
        </span>
        <span
          style={{
            fontFamily: "Lobster, cursive",
            margin: "0 0.5rem",
            paddingTop: "2rem",
          }}
        >
          {monsterName.split(" ")[1]}
        </span>
        <span
          style={{
            fontFamily: "Madimi One, cursive",
            paddingLeft: "0.75rem",
            paddingTop: "5 rem",
          }}
        >
          {monsterName.split(" ")[2]}
        </span>
      </h1>
      {/* Display error message if user is not logged in */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      {successMessage && <div className="successMessage">{successMessage}</div>}
      {/* Display monster name */}
      {/* SVG container */}

      <div className="monstermaker-combined-svg-container">
        {/* Render the combined SVG */}
        <svg
          className="monstermaker-combined-svg"
          dangerouslySetInnerHTML={{ __html: combineSVGs() }}
        />
      </div>

      <div className="makemonster-buttons-container">
        {/* Refresh button */}
        <button onClick={handleRefresh} className="makemonster-refresh-btn">
          <img
            src={refresh}
            alt="refresh"
            className="makemonster-refresh-img"
          />
          <span className="makemonster-button-label">Generate New Monster</span>
        </button>

        {/* Add to library button */}
        <button
          onClick={handleAddToLibrary}
          className="makemonster-add-to-library-btn"
        >
          <img src={plus} alt="plus" className="makemonster-plus-img" />
          <span className="makemonster-button-label">Add to Library</span>
        </button>

        {/* Download button */}
        <button onClick={handleDownload} className="makemonster-download-btn">
          <img
            src={download}
            alt="download"
            className="makemonster-download-img"
          />
          <span className="makemonster-button-label">Download Monster</span>
        </button>
      </div>
    </div>
  );
}

export default MonsterMaker;
