import { Routes, Route } from "react-router-dom";
import Channels from "./Channels";
import Channel from "./Channel";

export default function main(){
    return (
        <div>
            <div className="h-full">
                <Routes>
                    <Route exact path="/" element={<Channels />}/>
                    <Route path="/:channelID" element={<Channel />}/>
                </Routes>
            </div>
        </div>
    );
}