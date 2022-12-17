import React from 'react';
export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={{name: "Siddik"}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;