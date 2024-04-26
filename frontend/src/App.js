import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home.js";
import LoginForm from "./login/loginForm.js";
import MonsterMaker from "./components/monsterMaker.js";
import Library from "./components/library.js";
import RegisterForm from "./login/registerForm.js";
import About from "./components/about.js";
function App() {
  return (
    <>
      <button
        onClick={() =>
          fetch(
            process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"
          ).then((r) => r.text().then((d) => alert(d)))
        }
      >
        click me!!
      </button>
      <Router>
        <Routes>
          {" "}
          {/* Use Routes instead of Switch */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/monsterMaker" element={<MonsterMaker />} />
          <Route path="/library" element={<Library />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
