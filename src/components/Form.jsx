import React from 'react';
import classes from "../styles/Form.module.css";


const Form = ({ children, className, ...rest }) => {
    return (
        <form className={`${className} ${classes.form}`}>
            {children}
        </form>
    )
}

export default Form;