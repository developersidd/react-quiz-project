import React from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import classes from "../../styles/Account.module.css";

const Account = () => {

  const { firebaseAuth: { user, logOut } } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut();
    localStorage.removeItem("redirected_url")
    navigate("/");
  }


  return (
    <div className={classes.account}>
      {
        user.email ?
          <>
            <span className="material-icons-outlined" title="Account">
              account_circle
            </span>
            <span> {user.displayName} </span>
            <span onClick={handleLogout} className="material-icons-outlined" title="Logout"> logout </span>
          </>
          :
          <>
            <NavLink to="/signup">Signup</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>

      }

    </div>
  )
}

export default Account
