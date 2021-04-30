import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
    <section className="nav__root">
        <ul className="nav__list">
            <li className="nav__listitem">
                <Link className="nav__link" to="/">
                    Home
                </Link>
            </li>
            <li className="nav__listitem">
                <Link className="nav__link" to="/gameslist">
                    Mac Games
                </Link>
            </li>
            <li className="nav__listitem">
                <Link className="nav__link" to="/mygames">
                    My Games
                </Link>
            </li>
        </ul>
    </section>
);

export default Navigation;
