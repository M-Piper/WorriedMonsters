import React from 'react';
import { Link } from 'react-router-dom';
import './about.css';
import Menu from './menu.js';

const About = () => {
    return (
        <div className="about-container">
            <Menu />
                <div className="text-container">
                    <p className="long-text-italic oxford-definition">
                        NOUN 1.a. c1375– Originally: a mythical creature which is part animal and part human, or combines elements of two or more animal forms, and is frequently of great size and ferocious appearance. Later, more generally: any imaginary creature that is large, ugly, and frightening. - Oxford Dictionary of English
                    </p>

                    <p className="long-text">
                        Admittedly, it is universally known that a monster in possession of an appetite must be in want of a crowd of villagers to eat. Fair enough. The monster community doesn't deny this fact of life. That being said, have you ever stopped to consider that a monster might have problems too? The monster community is sick and tired of these baseless (well, to be fair, sometimes very well-founded) claims and want to make it known that many of them have fears and anxieties of their own. </p>
                    <p className="long-text">
                        They will concede that a large contingent of monsters do, in fact, regularly rampage, maul, and pillage. But that's not what we're here to talk about.</p>
                    <p className="long-text">
                        This site is dedicated to fostering empathy for the <em>worried</em> monsters. The nervous ones who, for example, have to overcome their severe agoraphobia in order to strike fear into the hearts of the locals. It takes courage to face a whole group like that! Admittedly, the subsequent battering, maiming, etc is less than ideal but the point still stands.</p>
                    <p className="long-text-emph">
                        Monsters have worries too!
                    </p>
                </div>
            </div>
    );
}

export default About;