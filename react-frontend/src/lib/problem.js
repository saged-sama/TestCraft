export async function addNewProblem(problem){
    console.log(problem);
    try{
        const APIRoot = process.env.REACT_APP_API_ROOT;
        const newProblemAPI = process.env.REACT_APP_ADD_NEW_PROBLEM;
        const response = await fetch(APIRoot + newProblemAPI, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(problem)
        });
        if(!response.ok){
            throw Error("Could not add new problem")
        }
        const resp = await response.json();
        const problemID = resp.problemID;
        return problemID;
    }catch(err){
        console.error("Could not add new problem");
        return "";
    }
}

export async function addProblemToCollection(collectionID, problemID){
    try{
        const APIroot = process.env.REACT_APP_API_ROOT;
        const addProblemToCollectionAPI = process.env.REACT_APP_ADD_PROBLEM_TO_COLLECTION;
        const response = await fetch(APIroot + addProblemToCollectionAPI, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                problemID,
                collectionID
            })
        });
        if(!response.ok){
            throw Error("Could not add problem to collection")
        }
    }catch(err){
        console.error("Could not add problem to collection: ", err);
    }
}