import React from 'react';
import classes from "../styles/TextInput.module.css";

const TextInput = ({icon, component, ...rest }) => {
    return (
        <div style={{marginTop: component ? "20px" : ""}} className={classes.textInput}>
            <input {...rest} />
            <span className="material-icons-outlined"> {icon} </span>
        </div>
    );
};

export default TextInput;