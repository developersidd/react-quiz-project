import React from 'react';
import classes from "../styles/Illustration.module.css";

const Illustration = ({imgPath}) => {
  return (
    <div className={classes.illustration}>
            <img src={imgPath} alt="person" />
          </div>
  )
}

export default Illustration;