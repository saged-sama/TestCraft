import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Explore from "./Explore";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../lib/AuthProvider";
import Profile from "./Profile";
import Channels from './Channels';
import Channel from "./Channel";

export default function Console(){
    const { loginState } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!loginState){
            console.log(loginState);
            navigate("/auth/login");
        }
    }, [loginState, navigate]);

    return (
        <div>
            <Navbar />
            <div className="h-full">
                <Routes>
                    <Route exact path="/" element={<Dashboard />}/>
                    <Route path="/dashboard/*" element={<Dashboard />}/>
                    <Route path="/explore/*" element={<Explore />}/>
                    <Route path="/profile" element={<Profile />}/>
                    <Route exact path="/Channels/*" element={<Channels />}/>
                    <Route path="/Channel/:channelID" element={<Channel/>} />
                </Routes>
            </div>
        </div>
    );
}