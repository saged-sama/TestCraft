import { useEffect } from "react";
// import { useParams } from "react-router-dom";

export default function Collection () {
    // const {collectionID} = useParams();
    // const [collection, setCollection] = useState({});
    const collection = {
        collectionid: "alskda",
        collectionName: "ami bhat khai"
    };
    // const [newProblem, setNewProblem] = useState(false);

    useEffect(() => {
        // const getCollection = async (collectionID) => {
        //     try{
        //         const response = await fetch("http://localhost:8000/get-collection-by-id", {
        //             method: "POST",
        //             credentials: "include",
        //             headers: {
        //                 "Content-type": "application/json"
        //             },
        //             body: JSON.stringify({
        //                 collectionID: collectionID
        //             })
        //         });
        //         if(!response.ok){
        //             throw Error("Could not get collection by id");
        //         }
        //         const resp = await response.json();
        //         const col = resp.col;
        //         setCollection(col);
        //     } catch(err){
        //         console.error("Could not get collection by id");
        //     }
        // };
        // getCollection(collectionID);
    });

    return (
        <div>
            {/* Header */}
            <div className="hidden border-b-2 lg:flex">
                <h1 className="text-xl">Collections | <span className="text-red-300">{collection.collectionName}</span></h1>
            </div>
            
        </div>
    )
}