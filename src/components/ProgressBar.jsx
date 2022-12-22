import React, { useRef, useState } from 'react';
import classes from "../styles/ProgressBar.module.css";
import Button from './Button';

const ProgressBar = ({ prev, next, percentage, submit }) => {
    const toolTipRef = useRef();
    const [toolTip, setToolTip] = useState(false);
    const toggleToolTip = () => {
        if (toolTip) {
            setToolTip(false);
            toolTipRef.current.style.display = 'none';
        } else {
            setToolTip(true);
            toolTipRef.current.style.left = `calc(${percentage}% - 65px)`;
            toolTipRef.current.style.display = 'block';
        }
    }

    return (
        <div className={classes.progressBar}>
            <div className={classes.backButton} onClick={prev}>
                <span className="material-icons-outlined"> arrow_back </span>
            </div>
            <div className={classes.rangeArea}>
                <div className={classes.tooltip} ref={toolTipRef}>{percentage}% Complete!</div>
                <div className={classes.rangeBody}>
                    <div className={classes.progress} onMouseOver={toggleToolTip} onMouseOut={toggleToolTip} style={{ width: `${percentage}%` }}></div>
                </div>
            </div>
            <Button className={classes.next} onClick={percentage === 100 ? submit : next}>
                <span>{percentage === 100 ? "Submit Questions" : "Next Question"}</span>
                <span className="material-icons-outlined"> arrow_forward </span>
            </Button>
        </div>
    )
}

export default ProgressBar;