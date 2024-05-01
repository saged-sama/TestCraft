import { Routes, Route } from "react-router-dom";
import AllChannels from "./AllChannels";
import Channel from "./Channel";

export default function ManageChannels() {
    return (
        <div className="flex flex-col mx-5 gap-2 w-full h-full">
            <Routes>
                <Route exact path="/*" element={<AllChannels />} />
                <Route path="/:channelID" element={<Channel />} />
            </Routes>
        </div>
    )
}