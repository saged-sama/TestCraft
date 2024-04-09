import { useContext } from "react";
import { AuthContext } from "../../lib/AuthProvider";
import { AppContext } from "../../lib/AppControlProvider";
import Login from "../authentication/Login";

export default function Dashboard() {
    const { loginState } = useContext(AuthContext);
    const { setPageStateTo } = useContext(AppContext);

    if(loginState === false){
        setPageStateTo({app: "auth", page: "login"});
        return (
            <Login />
        );
    }

    return (
        <div>Dashboard</div>
    );
}