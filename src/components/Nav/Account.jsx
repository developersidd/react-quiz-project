import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from "../../styles/Account.module.css";

const Account = () => {
  return (
    <div className={classes.account}>
      <span className="material-icons-outlined" title="Account">
        account_circle
      </span>
      <NavLink to="signup">Signup</NavLink>
       {/*<span className="material-icons-outlined" title="Logout"> logout </span> */}
    </div>
  )
}

export default Account
