import { Search, CirclePlus, SquareX } from "lucide-react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AllCollections from "./AllCollections";

export default function ManageCollections() {
    const [newCollection, setNewCollection] = useState(false);
    const [collectionAdded, setCollectionChanged] = useState(false);

    async function addCollection() {
        const collectionName = document.getElementById("collectionName").value;
        try{
            const response = await fetch(process.env.REACT_APP_ADD_COLLECTION, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    collectionName: collectionName
                }),
                credentials: 'include'
            });
            if(!response.ok){
                console.error("Could not add collection");
            }
            // const resp = await response.json();
            // console.log(resp.collectionID);
            setCollectionChanged(true);
            setNewCollection(false);
        } catch(err){
            console.error("Couldn't add collection: ", err);
        }
    }

    return (
        <div className="flex flex-col m-10 p-10 gap-2">
            {/* Header */}
            <div className="border-b-2 flex">
                <h1 className="text-xl">Collections</h1>
            </div>
            <div className="flex flex-col-reverse md:flex-row justify-between items-center">
                <button className="btn btn-neutral btn-ghost btn-sm" onClick={() => setNewCollection(!newCollection)}>
                    {!newCollection && <span className="flex items-center gap-1"><CirclePlus className="w-4 h-4" /> Create New Collection</span>}
                    {newCollection && <span className="flex items-center gap-1"><SquareX className="w-4 h-4" /> Cancel</span>}
                </button>

                <label className="input input-bordered w-1/2 flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search Collections..." />
                    <Search />
                </label>
            </div>
            {newCollection &&
                <div className="card border-t-2 card-compact text-md font-normal w-1/2 m-5 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="card-title text-sm">
                            <label className="input w-full input-bordered flex items-center">
                                {/* <User className="w-4 h-4" /> */}
                                <input type="text" className="grow md:input-md input-sm" placeholder="Collection Name" id="collectionName"/>
                            </label>
                            <button onClick={addCollection} className="btn btn-primary btn-md w-20">Add</button>
                        </div>
                        {/* <div className="card-actions justify-end">
                        </div> */}
                    </div>
                </div>
            }
            <Routes>
                <Route exact path="/*" element={<AllCollections collectionAdded={collectionAdded} setCollectionChanged={setCollectionChanged} />} />
            {/* <Route path="/:collectionID" element={<ManageCollection />} /> */}
            </Routes>
        </div>
    );
}