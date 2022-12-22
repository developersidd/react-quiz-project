import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from "../styles/Video.module.css";

const Video = ({ title, youtubeId, noq }) => {
    return (
        <NavLink to={noq > 0 ? `/quiz/${youtubeId}` : "/"} state={{title: title}}>
            <div className={classes.video}>
                <img src={`http://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`} alt={title} />
                <p> {title}</p>
                <div className={classes.qmeta}>
                    <p> {noq} Questions</p>
                    <p>Score : {noq * 5} </p>
                </div>
            </div>
        </NavLink>
    )
}

export default Video;