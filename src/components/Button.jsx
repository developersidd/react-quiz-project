import React from 'react';
import classes from "../styles/Button.module.css";

const Button = ({ className, children, onClick, ...rest }) => {
    return (
        <button onClick={() => onClick()} className={`${classes.button} ${className}`} {...rest}>
            {children}
        </button>)
}

export default Button;