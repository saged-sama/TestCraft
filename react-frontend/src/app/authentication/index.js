import {Routes, Route} from "react-router-dom";
import AuthNavbar from "./AuthNavbar";
import Login from "./Login";
import Register from "./Register";

export default function Authentication(){
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