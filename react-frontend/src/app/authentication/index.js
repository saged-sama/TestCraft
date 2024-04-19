import {Routes, Route, useNavigate} from "react-router-dom";
import AuthNavbar from "./AuthNavbar";
import Login from "./Login";
import Register from "./Register";
import { useEffect } from "react";
import { isAuthenticated } from "../../lib/authenticate";

export default function Authentication(){
    const navigate = useNavigate();
    useEffect(() => {
        if(isAuthenticated()){
            navigate("/app/dashboard/manageCollections");
        }
    })

    return (
        <div>
            <AuthNavbar />
            <section className="h-screen">
                <Routes>
                    <Route exact path="/" element={<Register />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                </Routes>
            </section>
        </div>
    );
}