import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { useLocation } from 'react-router-dom';
import classes from "../styles/MiniPlayer.module.css";
const MiniPlayer = ({ videoID }) => {
    const location = useLocation();
    const { title } = location.state;
    const videoUrl = `https://www.youtube.com/watch?v=${videoID}`
    const playerRef = useRef();
    const [status, setStatus] = useState(false);

    const togglePlayer = () => {
        if (!status) {
            playerRef.current.classList.remove(classes.floatingBtn);
            setStatus(true);
        } else {
            playerRef.current.classList.add(classes.floatingBtn);
            setStatus(false);
        }
    };

    return (
        <div className={`${classes.miniPlayer} ${classes.floatingBtn}`} onClick={togglePlayer} ref={playerRef}>
            <span className={`material-icons-outlined ${classes.open}`}> play_circle_filled </span>
            <span className={`material-icons-outlined ${classes.close}`} onClick={togglePlayer}> close </span>
            <ReactPlayer className={classes.player} url={videoUrl} playing={status} controls height="168px" width="300px" />
            <p>{title} </p>
        </div>
    )
}

export default MiniPlayer;