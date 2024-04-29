import { Share, Edit, Trash2, Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { dateExtractFromMySQLDateTime } from "../../../../lib/useDate";

export default function AllCollections(props) {
    const [collections, setCollections] = useState([]);
    const { collectionAdded, setCollectionChanged } = props;

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

    async function deleteCollection(collectionID){
        try{
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
            if(!response.ok){
                console.error("Could not delete collection");
            }
            // console.log(await response.json());
            setCollectionChanged(true);
        } catch(err){
            console.error("Could not delete collection");
        }
    }

    return (
        <div className="gap-5">
            {collections.map(collection => {
                return (
                    <div key={collection.collectionID} className="card border-t-2 card-compact text-md font-normal w-full m-5 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="card-title text-sm justify-between">
                                <div className="flex ">
                                    <h1 title="Collection Name" className="font-bold">{collection.collectionName}</h1>
                                    <Dot />
                                    <p title="Collection Owner" className="font-medium">{collection.ownerName}</p>
                                </div>
                                {/* <div className="">
                                        Last Modified: {collection.lastModified}
                                    </div> */}
                                <div className="">
                                    Created on: {collection.createdOn}
                                </div>
                            </div>
                            <div>

                            </div>
                            <div className="card-actions justify-end">
                                <button className="btn btn-neutral btn-sm" title="Share"><Share className="w-4 h-4" /></button>
                                <button className="btn btn-neutral btn-sm" title="Edit"><Edit className="w-4 h-4" /> </button>
                                <button className="btn btn-neutral btn-sm" title="Delete" onClick={() => deleteCollection(collection.collectionID)}><Trash2 className="w-4 h-4"/> </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}