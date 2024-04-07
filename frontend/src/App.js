import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home.js';
import LoginForm from './login/loginForm.js';
import MonsterMaker from './components/monsterMaker.js';
import Library from './components/library.js';

function App() {
    return (
        <Router>
            <Routes> {/* Use Routes instead of Switch */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/monsterMaker" element={<MonsterMaker />} />
                <Route path="/library" element={<Library />} />
            </Routes>
        </Router>
    );
}

export default App;
