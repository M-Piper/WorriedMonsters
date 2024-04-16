import React from 'react';
import { Link } from 'react-router-dom';
import './about.css';
import Menu from './menu.js';

const About = () => {
    return (
        <div className="about-container">
            <Menu />
                <div className="text-container">
                    <p className="long-text">
                        Everyone hears about the truly scary monsters who stir up trouble, rampage villages, and generally cause problems. But what about the monsters with problems of their own?</p>
                    <p className="long-text">
                        Have you ever tried to strike fear into the soul of local farmers whilst battling a crippling fear of cows? Well, Mildred the Agitated does, and bovinophobia effects not only her quality of life but also her ability to do her job.</p>
                    <p className="long-text"> Ever tried to whisper mutinous thoughts into the ears of the local militia whilst battling crippling agrophobia? No? Well, Yves the Fearful hasn't been able to stir up even a minor resentment amongst the soldiers, and frankly, it's really been getting him down! Poor guy can barely manage to mutter a creepy prophetic word at locals walking through the forest at night.</p>
                    <p className ="long-text">This site is dedicated to fostering empathy for the <em>worried</em> monsters. The nervous ones who bravely face their fears so that they, in turn, can terrify their local communities as nature would have it.</p>
                    <p className="long-text-emph">
                        Monsters have worries too!</p>
                </div>
            </div>
    );
}

export default About;