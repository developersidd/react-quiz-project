import React from 'react';
import signupSvg from "../../assets/images/signup.svg";
import Button from '../Button';
import Checkbox from '../Checkbox';
import Form from '../Form';
import Illustration from '../Illustration';
import classes from "../../styles/Signup.module.css";
import TextInput from '../TextInput';
import { NavLink } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <h1> Create an Account </h1>
      <div class="column">
        <Illustration imgPath={signupSvg} />
        <Form className={classes.signup}>
          <TextInput component icon="person" type="text" placeholder="Enter Name" />
          <TextInput component icon="alternate_email" type="email" placeholder="Enter Email" />
          <TextInput component icon="lock" type="password" placeholder="Enter Password" />
          <TextInput component icon="lock_clock" type="password" placeholder="Confirm Password" />

          <Checkbox text="I agree to the Terms & Conditions" />

          <Button> <span> Submit Now </span>  </Button>

          <div class="info">
            Already have an account? <NavLink to="/login">Login</NavLink> instead.
          </div>

        </Form>
      </div>
    </>
  )
}

export default Login
