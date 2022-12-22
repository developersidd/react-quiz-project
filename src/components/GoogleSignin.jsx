import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import classes from "../styles/GoogleSignIn.module.css";
import img from "../assets/images/google-signup.png"
const GoogleSignIn = () => {
    const { firebaseAuth: { googleSignIn, setFirebaseError, setLoading } } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {

        try {
            await googleSignIn();
            setFirebaseError("");
            const redirect_uri = JSON.parse(localStorage.getItem("redirect_url"));
            navigate(redirect_uri ? redirect_uri : "/");
        } catch (err) {
            if (err.message === "Firebase: Error (auth/popup-closed-by-user).") {
                setLoading(false);
            }
            setFirebaseError(err.message);
        }
    }

    return (
        <button onClick={handleGoogleSignIn} className={classes.googleSignInBtn}>
            <img src={img} alt="google sign up" />
        </button>
    )
}

export default GoogleSignIn
