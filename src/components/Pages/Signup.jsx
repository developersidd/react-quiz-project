import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import signupSvg from "../../assets/images/signup.svg";
import useAuth from '../../Hooks/useAuth';
import classes from "../../styles/Signup.module.css";
import Button from '../Button';
import Checkbox from '../Checkbox';
import Form from '../Form';
import GoogleSignIn from '../GoogleSignin';
import Illustration from '../Illustration';
import SetPageTitle from '../SetPageTitle';
import TextInput from '../TextInput';

const Signup = () => {
  const [data, setData] = useState({ name: "", email: "", password: "", confirmPassword: "", checked: false });

  const { firebaseAuth: { registerUser, firebaseError, user, setFirebaseError, setLoading } } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const redirect_url = location.state?.from?.pathname;
  redirect_url && localStorage.setItem("redirect_url", JSON.stringify(redirect_url));
  // destructure user data
  const { name, email, password, confirmPassword, checked } = data;

  // get data from user
  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checked" ? target.checked : target.value;
    setData({ ...data, [name]: value });
  };

  // handle sign up
  const handleSubmit = async (e) => {

    e.preventDefault();

    //validate input
    if (password !== confirmPassword) {
      return setFirebaseError("password and confirm password did not match");
    }

    if (password.length && confirmPassword.length <= 5) {
      return setFirebaseError("password and confirm password must be grater than 6");
    }

    try {
      await registerUser(name, email, password);
      setFirebaseError("");
      const redirect_uri = JSON.parse(localStorage.getItem("redirect_url"));
      navigate(redirect_uri ? redirect_uri : "/");
      // clear the form fields
      setData({ name: "", email: "", password: "", confirmPassword: "", checked: false });
    } catch (err) {
      setLoading(false)
      setFirebaseError(err.message);
    } 
  }




  return (
    <>
      <SetPageTitle title="Sign Up" />
      <h1> Create an Account </h1>
      <div className="column">
        <Illustration imgPath={signupSvg} />
        <Form onSubmit={handleSubmit} className={classes.signup}>
          <TextInput icon="person" onChange={handleInputChange} value={name} name="name" type="text" placeholder="Enter Name" />
          <TextInput icon="alternate_email" onChange={handleInputChange} value={email} name="email" type="email" placeholder="Enter Email" />
          <TextInput icon="lock" onChange={handleInputChange} value={password} name="password" type="password" placeholder="Enter Password" />
          <TextInput icon="lock_clock" onChange={handleInputChange} value={confirmPassword} name="confirmPassword" type="password" placeholder="Confirm Password" />

          <Checkbox name="checked" onChange={handleInputChange} checked={checked} text="I agree to the Terms & Conditions" />

          <Button type="submit"> <span> Submit Now </span>  </Button>

          {/* show error */}
          {firebaseError && <p className='error'> {firebaseError} </p>}
          {/* sign up with Google */}
          <p style={{textAlign: "center", paddingTop: "25px", fontWeight: "bold", fontSize: "13px"}}>Or Sign up with </p>
          <GoogleSignIn />
          
          <div className="info">
            Already have an account? <NavLink to="/login">Login</NavLink> instead.
          </div>

        </Form>
      </div>
    </>
  )
}

export default Signup
