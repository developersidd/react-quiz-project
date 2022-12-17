import React from 'react';
import classes from "../styles/Video.module.css";
import thumbnail from "../assets/images/3.jpg";
import { NavLink } from 'react-router-dom';

const Video = () => {
    return (
        <NavLink to="/quiz">
            <div className={classes.video}>
                <img src={thumbnail} alt="course thumbnail" />
                <p>#23 React Hooks Bangla - React useReducer hook Bangla</p>
                <div className={classes.qmeta}>
                    <p>10 Questions</p>
                    <p>Score : Not taken yet</p>
                </div>
            </div>
        </NavLink>
    )
}

export default Video;