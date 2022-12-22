import React from 'react';
import Loading from '../components/Loading';
import useFirebase from '../Hooks/useFirebase';
export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {

    const firebaseAuth = useFirebase();

    return (
        <AuthContext.Provider value={{ firebaseAuth }}>
            {firebaseAuth.loading && <Loading />}
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;