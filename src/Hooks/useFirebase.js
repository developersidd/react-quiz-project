import { createUserWithEmailAndPassword, getAuth, getIdToken, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from 'react';
import initFirebase from '../firebase';

initFirebase();

const useFirebase = () => {

    // firebase data
    const [user, setUser] = useState({});
    const [firebaseError, setFirebaseError] = useState("");
    const [loading, setLoading] = useState(true);

    // lest's Destructure signup or login data 
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    // firebase settings
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();


    const registerUser = async () => {
        const user = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
        updateProfile(auth.currentUser, {
            displayName: userName,
        });

        return user;
    }

    const loginUser = (e) => {
        setLoading(true);
        e.preventDefault();
        return signInWithEmailAndPassword(auth, userEmail, userPassword)
    }

    // Google sign in 
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        setLoading(true);
        signOut(auth)
            .then(res => {
                setUser({});
            })
            .finally(() => {
                setLoading(false);
            });
    }

    // user observer
    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getIdToken(user)
                    .then(idToken => localStorage.setItem("idToken", idToken));
                setUser(user);
            } else {
                setUser({});
            }
            setLoading(false)
        });

        return () => subscribe;

    }, [auth]);

    return { googleSignIn, registerUser, firebaseError, setUserEmail, setUserName, setUserPassword, user, logOut, loginUser, setFirebaseError, setUser, setLoading, loading, updateUser };
}

export default useFirebase;