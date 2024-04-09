import Navbar from "../../components/Navbar";
import Dashboard from "./Dashboard";
import Explore from "./Explore";
import {Routes, Route} from "react-router-dom";

export default function Console(){
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Dashboard />}/>
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/explore" element={<Explore />}/>
            </Routes>
        </div>
    );
}