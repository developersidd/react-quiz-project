import React from 'react';
import classes from "../styles/Answers.module.css";
import Checkbox from './Checkbox';

const Answers = () => {
  return (
    <div className="answers">
        <Checkbox className={classes.answer} text="Text Checkbox" />
    </div>
  )
}

export default Answers;