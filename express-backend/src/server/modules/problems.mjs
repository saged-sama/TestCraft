import collection from "../objects/collection.mjs";
import user from "../objects/user.mjs";

export default function problem(app, database){
    
    app.post("/add-new-problem", async(req, res) => {
        try{
            const { userID, authToken } = req.cookies;
            const isAuthorized = await user(userID, authToken, database).isAuthorized();
            if (!isAuthorized) {
                return res.status(401).json({
                    error: "Unauthorized action"
                });
            }
            // console.log(req.body);
            const {subjectID, topics, description, solution} = req.body;
            console.log({subjectID, topics, description, solution});
            const [rows, _] = await database.connection.promise().query("select addproblem(?, ?, ?, ?, ?) as problemID;", [subjectID, topics, description, solution, userID]);
            const problemID = rows[0]["problemID"];
            return res.status(200).json({
                problemID: problemID,
                message: "Successfully added problem"
            });
        } catch(err){
            console.error("Could not add new problem: ", err);
            return res.status(500).json({
                error: "Could not add new problem"
            });
        }
    });

    app.delete("/delete-problem", async (req, res) => {
        try{
            const { userID, authToken } = req.cookies;
            const isAuthorized = await user(userID, authToken, database).isAuthorized();

            const {problemID, collectionID} = req.body;

            const permission = await collection(collectionID, database).getPermission(userID);
            
            if (!isAuthorized || !permission) {
                return res.status(401).json({
                    error: "Unauthorized action"
                });
            }

            await database.connection.promise().execute("delete from problem where id = ?", [problemID]);
            return res.status(201).json({
                message: "Successfully deleted problem to collection"
            });
        } catch(err){
            console.log("Could not delete problem from collection: ", err);
            return res.status(500).json({
                error: "Could not delete problem from collection"
            });
        }
    });

    app.get("/get-problems-by-collection", async (req, res) => {
        try{
            const { userID, authToken } = req.cookies;
            let isAuthorized = await user(userID, authToken, database).isAuthorized();
            const {collectionID} = req.query;
            const permission = await collection(collectionID, database).getPermission(userID);
            if(!isAuthorized || !permission){
                return res.status(401).json({
                    error: "Unauthorized action"
                });
            }
            const q = "select c.problemID as problemID, s.title as subject, p.creatorID, p.topics, p.probDesc as description, p.solution, p.creationTime as dateCreated from collectionProblems c join problem p on c.problemID = p.id join subjects s on p.subj = s.id where c.collectionID = ? order by dateCreated desc;";
            const [rows, _] = await database.connection.promise().query(q, [collectionID]);
            const problems = rows;
            return res.status(200).json({
                problems
            });
        } catch(err){
            console.error("Could not get problems with collectionID: ", err);
            return res.status(500).json({
                error: "Could not get problems with collectionID"
            });
        }
    });

    app.post("/add-problem-to-collection", async (req, res) => {
        try{
            const { userID, authToken } = req.cookies;
            const isAuthorized = await user(userID, authToken, database).isAuthorized();

            const {collectionID, problemID} = req.body;

            const permission = await collection(collectionID, database).getPermission(userID);
            
            if (!isAuthorized || !permission) {
                return res.status(401).json({
                    error: "Unauthorized action"
                });
            }

            await database.connection.promise().execute("insert into collectionProblems values(?, ?, ?)", [collectionID, problemID, userID]);
            return res.status(201).json({
                message: "Successfully added problem to collection"
            });
        } catch(err){
            console.log("Could not add problem to collection: ", err);
            return res.status(500).json({
                error: "Could not add problem to collection"
            });
        }
    })
}