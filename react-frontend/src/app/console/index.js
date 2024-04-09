import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Explore from "./Explore";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../lib/AuthProvider";

export default function Console(){
    const {loginState} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!loginState){
            console.log(loginState);
            navigate("/auth/login");
        }
    });

    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Dashboard />}/>
                <Route path="/dashboard/*" element={<Dashboard />}/>
                <Route path="/explore/*" element={<Explore />}/>
            </Routes>
        </div>
    );
}