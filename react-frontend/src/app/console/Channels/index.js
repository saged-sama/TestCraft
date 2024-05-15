import { Routes, Route } from "react-router-dom";
import Channels from "./Channels";
import Channel from "./Channel";

export default function main() {
    return (
        <div className="w-full h-full p-2">
            <Routes>
                <Route exact path="/" element={<Channels />} />
                <Route path="/:channelID/:groupID/*" element={<Channel />} />
            </Routes>
        </div>
    );
}