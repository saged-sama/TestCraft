import { Routes, Route } from "react-router-dom";
import AllChannels from "./AllChannels";

export default function ManageChannels() {
    return (
        <div className="flex flex-col mx-5 gap-2 w-full h-full">
            <Routes>
                <Route exact path="/*" element={<AllChannels />} />
            </Routes>
        </div>
    )
}