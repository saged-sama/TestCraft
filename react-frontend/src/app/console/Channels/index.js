import { Routes, Route } from "react-router-dom";
import Channels from "./Channels";
import Channel from "./Channel";
import Exam from "../../takeExam/Exam"

export default function main() {
    return (
        <div className="h-full p-2">
            <Routes>
                <Route exact path="/" element={<Channels />} />
                <Route path="/:channelID" element={<Channel />} />
            </Routes>
        </div>
    );
}