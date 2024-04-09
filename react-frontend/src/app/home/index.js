import HomeNavbar from "./HomeNavbar";
import { Routes, Route } from "react-router-dom";
import Landing from "./Landing"
import Documentation from "./Documentation";
import Guide from "./Guide";

export default function Home(){
    return (
        <div>
            <HomeNavbar />
            <section className="h-screen bg-image bg-cover">
                <Routes>
                    <Route exact path="/" element={<Landing />} />
                    <Route path="/documentation" element={<Documentation />} />
                    <Route path="/guide" element={<Guide />} />
                </Routes>
            </section>
        </div>
    );
}