import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppControlProvider = ({ children }) => {
    const [pageState, setPageState] = useState({
        app: "home",
        page: "home"
    });
    
    const setPageStateTo = (state) => {
        setPageState(state);
    }

    return (
        <AppContext.Provider value={{pageState, setPageStateTo}}>
            {children}
        </AppContext.Provider>
    );
}