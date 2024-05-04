import { Share, Edit, Trash2, Dot, X, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { dateExtractFromMySQLDateTime } from "../../../../lib/useDate";
import { Search, CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function AllCollections() {
    const [collections, setCollections] = useState([]);
    const [collectionAdded, setCollectionChanged] = useState(false);

    useEffect(() => {
        async function fetchCollections() {
            try {
                const APIRoot = process.env.REACT_APP_API_ROOT;
                const getAllCollectionByUserID = process.env.REACT_APP_GET_ALL_COLLECTIONS_BY_USER_ID;
                const response = await fetch(APIRoot + getAllCollectionByUserID, {
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
            const APIRoot = process.env.REACT_APP_API_ROOT;
            const deleteCollectionAPI = process.env.REACT_APP_DELETE_COLLECTION;
            const response = await fetch(APIRoot + deleteCollectionAPI, {
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
            const APIRoot = process.env.REACT_APP_API_ROOT;
            const shareCollectionWithUserAPI = process.env.REACT_APP_SHARE_COLLECTION_WITH_USER;
            const response = await fetch(APIRoot + shareCollectionWithUserAPI, {
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
        try {
            const APIRoot = process.env.REACT_APP_API_ROOT;
            const addCollectionAPI = process.env.REACT_APP_ADD_COLLECTION;
            const response = await fetch(APIRoot + addCollectionAPI, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    collectionName: collectionName
                }),
                credentials: 'include'
            });
            if (!response.ok) {
                console.error("Could not add collection");
            }
            // const resp = await response.json();
            // console.log(resp.collectionID);
            setCollectionChanged(true);
            document.getElementById("newCollection").close();
        } catch (err) {
            console.error("Couldn't add collection: ", err);
        }
    }

    const searchCollections = async () => {
        const searchText = document.getElementById("searchCollections").value;
        try {
            const APIRoot = process.env.REACT_APP_API_ROOT;
            const searchCollectionsAPI = process.env.REACT_APP_SEARCH_COLLECTIONS;
            const response = await fetch(APIRoot + searchCollectionsAPI + `?search=${searchText}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                console.error("Could not search collections");
            }
            const resp = await response.json();
            setCollections(resp.collections);
        } catch (err) {
            console.error("Couldn't add collection: ", err);
        }
    }

    return (
        <div className="flex flex-col h-full overscroll-y-contain gap-2">
            {/* Header */}
            <div className="hidden border-b-2 lg:flex">
                <h1 className="text-xl">Collections</h1>
            </div>
            <div className="flex flex-col-reverse md:flex-row justify-between items-center">
                <button className="btn btn-neutral btn-ghost btn-sm" onClick={() => document.getElementById("newCollection").showModal()}>
                    <span className="flex items-center gap-1"><CirclePlus className="w-4 h-4 text-primary" /> Create New Collection</span>
                </button>

                <label className="hidden input input-bordered md:w-1/2 md:flex items-center gap-2">
                    <input id="searchCollections" type="text" className="grow" placeholder="Search Collections..." onChange={searchCollections} />
                    <Search />
                </label>
            </div>

            <dialog id="newCollection" className="modal">
                <div className="modal-box bg-neutral gap-2">
                    <form method="dialog">
                        <button className="flex btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><X className="w-4 h-4" /></button>
                    </form>
                    <div className="card card-compact text-md font-normal">
                        <div className="card-body">
                            <h1>Try Giving Meaningful Names for Better Search</h1>
                            <div className="card-title text-sm">
                                <label className="input w-full input-bordered flex items-center">
                                    <input type="text" className="grow md:input-md input-sm" placeholder="Collection Name" id="collectionName" />
                                </label>
                                <button onClick={addCollection} className="btn btn-success btn-md w-20">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>

            <div className="flex flex-col items-center h-screen w-full overflow-y-scroll">
                {collections.length === 0 &&
                    <div className="flex items-center justify-center text-center p-10 gap-2">
                        <button className="btn btn-disabled text-error"><Trash /> Collections Set Empty</button>
                    </div>
                }
                {collections.map(collection => {
                    return (
                        <div key={collection.collectionID} className="card card-compact text-md font-normal w-3/4 m-2 bg-neutral shadow-xl">
                            <div className="card-body">
                                <div className="card-title text-sm justify-between">
                                    <div className="flex ">
                                        <h1 title="Collection Name" className="font-bold">{collection.collectionName}</h1>
                                        <Dot />
                                        <p title="Collection Owner" className="text-info font-medium">{collection.ownerName}</p>
                                    </div>
                                    <div className="hidden md:block text-xs">
                                        <span className="text-orange-400">Created on:</span> <span>{collection.createdOn}</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="stats shadow">

                                        <div className="stat">
                                            <div className="stat-figure text-accent">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                            </div>
                                            <div className="stat-title">Total problems</div>
                                            <div className="stat-value text-accent">25.6K</div>
                                            <div className="stat-desc">21% more than last month</div>
                                        </div>

                                        <div className="stat">
                                            <div className="stat-figure text-secondary">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                            </div>
                                            <div className="stat-title">Problem usage</div>
                                            <div className="stat-value text-secondary">2.6M</div>
                                            <div className="stat-desc">21% more than last month</div>
                                        </div>

                                        <div className="stat">
                                            <div className="stat-figure text-info">
                                                <div className="avatar">
                                                    <div className="w-16 rounded-full">
                                                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="kk"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="stat-value">86</div>
                                            <div className="stat-title">People involved</div>
                                            <div className="stat-desc text-info">31 tasks remaining</div>
                                        </div>

                                    </div>
                                </div>
                                <div className="card-actions justify-end">
                                    <div className="dropdown dropdown-left">
                                        <button tabIndex={0} className="btn btn-base-100 btn-sm" title="Share"><Share className="w-4 h-4" /></button>
                                        <div tabIndex={0} className="dropdown-content z-[1] menu p-5 gap-2 shadow bg-base-100 rounded-box w-80">
                                            <input type="text" className="input input-md input-bordered" placeholder="Search username..." id="sharedWith" />
                                            <button className="btn btn-accent" onClick={() => { shareWithUser(collection.collectionID) }}>Add</button>
                                        </div>
                                    </div>
                                    <Link to={`/app/dashboard/manageCollections/${collection.collectionID}`} className="btn btn-base-100 btn-sm" title="Edit"><Edit className="w-4 h-4" /> </Link>
                                    <button className="btn btn-base-100 btn-sm" title="Delete" onClick={() => deleteCollection(collection.collectionID)}><Trash2 className="w-4 h-4" /> </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}