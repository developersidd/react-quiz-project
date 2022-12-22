import React from 'react';
import classes from "../styles/TextInput.module.css";

const TextInput = ({ icon, component, ...rest }) => {
    return (
        <div  className={classes.textInput}>
            <input required {...rest} />
            <span className="material-icons-outlined"> {icon} </span>
        </div>
    );
};

export default TextInput;