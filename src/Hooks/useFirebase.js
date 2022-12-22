import { createUserWithEmailAndPassword, getAuth, getIdToken, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from 'react';
import firebaseInit from "../firebase";

firebaseInit();

const useFirebase = () => {

    // firebase data
    const [user, setUser] = useState({});
    const [firebaseError, setFirebaseError] = useState("");
    const [redirectUrl, setRedirectUrl] = useState("");
    const [loading, setLoading] = useState(true);

    // firebase settings 
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();


    //register user
    const registerUser = async (name, email, password) => {
        setLoading(true);
        await createUserWithEmailAndPassword(auth, email, password);

        // update profile
        await updateProfile(auth.currentUser, {
            displayName: name,
        });

        const user = auth.currentUser;
        setUser({
            ...user,
        });
        setLoading(false);
    }

    // login user
    const loginUser = async (email, password) => {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        setUser({
            ...user,
        });
        setLoading(false);
    }

    // Google sign in 
    const googleSignIn = async () => {
        setLoading(true);
        await signInWithPopup(auth, googleProvider);
        const user = auth.currentUser;
        setUser({
            ...user,
        });
        setLoading(false);
    };

    const logOut = () => {
        setLoading(true);
        signOut(auth)
            .then(res => {
                setUser({});
                localStorage.removeItem("idToken")
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setFirebaseError(err.message);
            });
    }

    // user observer
    useEffect(() => {
        const auth = getAuth();
        const subscribe = onAuthStateChanged(auth, (user) => {
            setLoading(true);
            if (user) {
                getIdToken(user)
                    .then(idToken => localStorage.setItem("idToken", idToken));
                setUser(user);
            } else {
                setUser({});
            }
            setLoading(false)
        });

        return subscribe;
    }, []);

    return { googleSignIn, registerUser, firebaseError, setFirebaseError, user, logOut, loginUser, loading, setLoading };
}

export default useFirebase;