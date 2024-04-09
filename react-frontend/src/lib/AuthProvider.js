import { createContext, useState } from "react";
import { isAuthenticated } from "./authenticate";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loginState, setLoginState] = useState(isAuthenticated());

    const setLoginStateTrue = () => {
        setLoginState(true);
    };

    const setLoginStateFalse = () => {
        setLoginState(false);
    };

    return (
        <AuthContext.Provider value = {{ loginState, setLoginStateTrue, setLoginStateFalse }}>
            {children}
        </AuthContext.Provider>
    );
};