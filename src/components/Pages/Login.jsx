import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import loginSvg from "../../assets/images/login.svg";
import useAuth from '../../Hooks/useAuth';
import classes from "../../styles/Login.module.css";
import Button from '../Button';
import Form from '../Form';
import GoogleSignIn from '../GoogleSignin';
import Illustration from '../Illustration';
import SetPageTitle from '../SetPageTitle';
import TextInput from '../TextInput';
const Login = () => {
    const { firebaseAuth: { loginUser, firebaseError, setLoading, setFirebaseError, user } } = useAuth();
    const [data, setData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { email, password } = data;
    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setData({ ...data, [name]: value });
    };

    // handle sign up
    const handleSubmit = async (e) => {
        e.preventDefault();

        //validate input
        if (password.length <= 5) {
            return setFirebaseError("password password must be grater than 6");
        }

        try {
            await loginUser(email, password)
            setFirebaseError("");
            const redirect_uri = JSON.parse(localStorage.getItem("redirect_url"));
            setData({ email: "", password: "" });
            navigate(redirect_uri ? redirect_uri : "/");
        } catch (err) {
            setFirebaseError(err.message);
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <SetPageTitle title="Login" />

            <h1> Login to your account </h1>
            <div className="column">
                <Illustration imgPath={loginSvg} />
                <Form onSubmit={handleSubmit} className={classes.login}>
                    <TextInput icon="alternate_email" name="email" onChange={handleInputChange}
                        value={email} type="email" placeholder="Enter Email" />

                    <TextInput icon="lock" onChange={handleInputChange} name="password" value={password} type="password" placeholder="Enter Password" />

                    <Button type="submit"> <span> Submit Now </span> </Button>

                    {/* show error */}
                    {firebaseError && <p className='error'> {firebaseError} </p>}

                    <p style={{ textAlign: "center", paddingTop: "25px", fontWeight: "bold", fontSize: "13px" }}>Or Sign up with </p>
                    <GoogleSignIn />

                    <div className="info">Don't have an account? <NavLink to="/signup">Signup</NavLink> instead.</div>

                </Form>
            </div>
        </>
    )
}

export default Login;
