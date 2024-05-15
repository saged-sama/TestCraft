import { Routes, Route } from "react-router-dom"
import Explore from "./Explore"

export default function main() {
    return (
        <div>
            <div className="h-screen">
                <Routes>
                    <Route exact path = "/" element = {<Explore/>} />
                </Routes>
            </div>
        </div>
    );
}