import isAuthenticated from "../lib/checkAuth.mjs";

export default class collections{
    constructor(app, database) {
        this.addCollection = 'select addcollection(?, ?) as newCollection';
        this.renamecollection = 'update collections set collectionName = ? where id = ?';
        this.removecollection = 'call removecollection(?, ?)';

        app.post("/create-collection", async (req, res) => {
            try{
                const { userID, authToken } = req.cookies;
                const isAuthorized = await isAuthenticated({ userID, authToken }, database);
                if(!isAuthorized){
                    return res.status(401).json({
                        error: "Unauthorized action"
                    });
                }
                const { collectionName } = req.body;
                const [rows, _] = await database.connection.promise().query(this.addCollection, [collectionName, userID]);
                const collectionID = rows[0]['newCollection'];
                return res.status(200).json({
                    message: "Successfully created a New Collection",
                    collectionID: collectionID
                });
            } catch(err){
                console.log("Could not create collection: ", err);
                return res.status(500).json({
                    error: "Could not create collection"
                });
            }
        });

        app.put("/rename-collection", async (req, res) => {
            try{
                const { userID, authToken } = req.cookies;
                let isAuthorized = await isAuthenticated({userID, authToken}, database);

                const { collectionID, newName } = req.body
                const [rows, _] = await database.connection.promise().query('select ownerID from collections where id = ?', [collectionID]);
                const ownerID = rows[0]["ownerID"];

                isAuthorized = isAuthorized && (ownerID === userID);
                if(!isAuthorized){
                    return res.status(401).json({
                        error: "Unauthorized action"
                    });
                }

                await database.connection.promise().execute(this.renamecollection, [newName, collectionID]);
                return res.status(200).json({
                    message: "Successfully renamed collection"
                });
            } catch(err){
                console.error("Could not rename collection: ", err);
                return res.status(500).json({
                    error: "Could not rename collection"
                });
            }
        });

        app.delete("/remove-collection", async (req, res) => {
            try{
                const { userID, authToken } = req.cookies;
                let isAuthorized = await isAuthenticated({userID, authToken}, database);

                const { collectionID } = req.body
                const [rows, _] = await database.connection.promise().query('select ownerID from collections where id = ?', [collectionID]);
                const ownerID = rows[0]["ownerID"];

                isAuthorized = isAuthorized && (ownerID === userID);
                if(!isAuthorized){
                    return res.status(401).json({
                        error: "Unauthorized action"
                    });
                }

                await database.connection.promise().execute(this.removecollection, [collectionID, ownerID]);
                return res.status(200).json({
                    message: "Successfully removed collection"
                });
            } catch(err){
                console.error("Could not remove collection: ", err);
                return res.status(500).json({
                    error: "Could not remove collection"
                });
            }
        });
    }
}