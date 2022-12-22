import React from 'react';
import classes from "../../styles/Nav.module.css";
import Account from './Account';
import logo from "../../assets/images/logo-bg.png";
import { NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
const Nav = () => {

    const { firebaseAuth: { user } } = useAuth();

    return (
        <nav className={classes.nav}>
            <ul>
                <li>
                    <NavLink to="/" className={classes.brand}>
                        <img src={logo} alt="Learn with Sumit Logo" />
                        <h3>Learn with Sumit</h3>
                    </NavLink>
                </li>
            </ul>
            <Account />
        </nav>

    )
}

export default Nav
