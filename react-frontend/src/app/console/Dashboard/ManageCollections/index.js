import { Routes, Route } from "react-router-dom";
import AllCollections from "./AllCollections";
import Collection from "./Collection";

export default function ManageCollections() {

    return (
        <div className="flex flex-col mx-5 gap-2 w-full">
            <Routes>
                <Route exact path="/*" element={<AllCollections />} />
                <Route path="/:collectionID" element={<Collection />} />
            {/* <Route path="/:collectionID" element={<ManageCollection />} /> */}
            </Routes>
        </div>
    );
}