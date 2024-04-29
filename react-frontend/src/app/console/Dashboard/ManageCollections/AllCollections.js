import { Share, Edit, Trash2, Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { dateExtractFromMySQLDateTime } from "../../../../lib/useDate";
import { Search, CirclePlus, SquareX } from "lucide-react";
import { Link } from "react-router-dom";

export default function AllCollections() {
    const [collections, setCollections] = useState([]);

    const [newCollection, setNewCollection] = useState(false);
    // const [showModal, setShowModal] = useState(false);
    const [collectionAdded, setCollectionChanged] = useState(false);

    useEffect(() => {
        async function fetchCollections() {
            try {
                const response = await fetch(process.env.REACT_APP_GET_ALL_COLLECTIONS_BY_USER_ID, {
                    method: "GET",
                    credentials: "include"
                });
                if (!response.ok) {
                    console.error("Coud not collect collections");
                }
                const coll = await response.json();
                coll.forEach(c => {
                    // eslint-disable-next-line
                    c.createdOn = dateExtractFromMySQLDateTime(c.createdOn);
                });
                setCollections(coll);
                setCollectionChanged(false);
                // console.log(coll);
            } catch (err) {
                console.error("Could not collect collections");
            }
        }
        fetchCollections();
    }, [collectionAdded, setCollectionChanged]);

    async function deleteCollection(collectionID) {
        console.log("what the")
        try {
            const response = await fetch(process.env.REACT_APP_DELETE_COLLECTION, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    collectionID: collectionID
                }),
                credentials: "include"
            });
            if (!response.ok) {
                console.error("Could not delete collection");
            }
            setCollectionChanged(true);
        } catch (err) {
            console.error("Could not delete collection");
        }
    }

    async function shareWithUser(collectionID) {
        const username = document.getElementById("sharedWith").value;
        // console.log(username);
        try {
            const response = await fetch("http://localhost:8000/share-collection-with-user", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    collectionID: collectionID,
                    username: username
                })
            });
            if (!response.ok) {
                throw Error("Could not add user to this collection");
            }
            console.log("Added user to collection successfully");
        } catch (err) {
            console.error("Could not add user to this collection");
        }
    }

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
        <div>
            {/* Header */}
            <div className="hidden border-b-2 lg:flex">
                <h1 className="text-xl">Collections</h1>
            </div>
            <div className="flex flex-col-reverse md:flex-row justify-between items-center">
                <button className="btn btn-neutral btn-ghost btn-sm" onClick={() => setNewCollection(!newCollection)}>
                    {!newCollection && <span className="flex items-center gap-1"><CirclePlus className="w-4 h-4" /> Create New Collection</span>}
                    {newCollection && <span className="flex items-center gap-1"><SquareX className="w-4 h-4" /> Cancel</span>}
                </button>

                <label className="hidden input input-bordered md:w-1/2 md:flex items-center gap-2">
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
                                <input type="text" className="grow md:input-md input-sm" placeholder="Collection Name" id="collectionName" />
                            </label>
                            <button onClick={addCollection} className="btn btn-primary btn-md w-20">Add</button>
                        </div>
                        {/* <div className="card-actions justify-end">
                </div> */}
                    </div>
                </div>
            }
            <div className="gap-5 h-1/2 overflow-y-scroll">
                {collections.map(collection => {
                    return (
                        <div key={collection.collectionID} className="card card-compact text-md font-normal w-6/7 m-5 bg-neutral shadow-xl">
                            <div className="card-body">
                                <div className="card-title text-sm justify-between">
                                    <div className="flex ">
                                        <h1 title="Collection Name" className="font-bold">{collection.collectionName}</h1>
                                        <Dot />
                                        <p title="Collection Owner" className="text-info font-medium">{collection.ownerName}</p>
                                    </div>
                                    {/* <div className="">
                                        Last Modified: {collection.lastModified}
                                    </div> */}
                                    <div className="text-xs">
                                        <span className="text-orange-400">Created on:</span> <span>{collection.createdOn}</span>
                                    </div>
                                </div>
                                <div>

                                </div>
                                <div className="card-actions justify-end">
                                    <div className="dropdown dropdown-top dropdown-end">
                                        <button tabIndex={0} className="btn btn-neutral btn-sm" title="Share"><Share className="w-4 h-4" /></button>
                                        <div tabIndex={0} className="dropdown-content z-[1] menu p-5 gap-2 shadow bg-base-100 rounded-box w-52">
                                            <input type="text" className="input input-md input-bordered input-primary" placeholder="Search username..." id="sharedWith" />
                                            <button className="btn btn-primary" onClick={() => { shareWithUser(collection.collectionID) }}>Add</button>
                                        </div>
                                    </div>
                                    <Link to={`/app/dashboard/manageCollections/${collection.collectionID}`} className="btn btn-neutral btn-sm" title="Edit"><Edit className="w-4 h-4" /> </Link>
                                    <button className="btn btn-neutral btn-sm" title="Delete" onClick={() => deleteCollection(collection.collectionID)}><Trash2 className="w-4 h-4" /> </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}