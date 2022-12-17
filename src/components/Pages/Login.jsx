import React from 'react';
import { NavLink } from 'react-router-dom';
import loginSvg from "../../assets/images/login.svg";
import classes from "../../styles/Login.module.css";
import Button from '../Button';
import Form from '../Form';
import Illustration from '../Illustration';
import TextInput from '../TextInput';
const Signup = () => {
    return (
        <>
            <h1> Login to your account </h1>
            <div class="column">
                <Illustration imgPath={loginSvg} />
                <Form className={classes.login}>
                    <TextInput icon="alternate_email" type="email" placeholder="Enter Email" />
                    <TextInput icon="lock" type="password" placeholder="Enter Password" />

                    <Button> <span> Submit Now </span> </Button>

                    <div class="info">Don't have an account? <NavLink to="/signup">Signup</NavLink> instead.</div>

                </Form>
            </div>
        </>
    )
}

export default Signup
