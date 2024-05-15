import collection from "../objects/collection.mjs";
import user from "../objects/user.mjs";

export default function collections(app, database) {
    const addCollection = 'call addcollection(?, ?)';
    const renamecollection = 'update collections set collectionName = ? where id = ?';
    const removecollection = 'call removecollection(?, ?)';
    const getAllCollectionsByUserId = 'call getAllCollectionsByUserID(?)';

    app.post("/create-collection", async (req, res) => {
        try {
            const { userID, authToken } = req.cookies;
            const isAuthorized = await user(userID, authToken, database).isAuthorized();
            // if (!isAuthorized) {
            //     return res.status(401).json({
            //         error: "Unauthorized action"
            //     });
            // }
            const { collectionName } = req.body;
            await database.connection.promise().execute(addCollection, [collectionName, userID]);
            return res.status(200).json({
                message: "Successfully created a New Collection"
            });
        } catch (err) {
            console.log("Could not create collection: ", err);
            return res.status(500).json({
                error: "Could not create collection"
            });
        }
    });

    app.put("/rename-collection", async (req, res) => {
        try {
            const { userID, authToken } = req.cookies;
            let isAuthorized = await user(userID, authToken, database).isAuthorized();

            const { collectionID, newName } = req.body
            const ownerID = await collection(collectionID, database).getOwner();

            isAuthorized = isAuthorized && (ownerID === userID);
            // if (!isAuthorized) {
            //     return res.status(401).json({
            //         error: "Unauthorized action"
            //     });
            // }

            await database.connection.promise().execute(renamecollection, [newName, collectionID]);
            return res.status(200).json({
                message: "Successfully renamed collection"
            });
        } catch (err) {
            console.error("Could not rename collection: ", err);
            return res.status(500).json({
                error: "Could not rename collection"
            });
        }
    });

    app.get("/get-all-collections-by-user-id", async (req, res) => {
        try {
            const { userID, authToken } = req.cookies;
            let isAuthorized = await user(userID, authToken, database).isAuthorized();
            // if (!isAuthorized) {
            //     return res.status(401).json({
            //         error: "Unauthorized action"
            //     });
            // }

            const [rows, _] = await database.connection.promise().query(getAllCollectionsByUserId, [userID]);

            return res.status(200).json(rows[0]);
        } catch (err) {
            console.error("Error fetching all collections: ", err);
            return res.status(404).json({
                error: "Could not get collections"
            });
        }
    });

    app.get("/get-collection-by-id", async (req, res) => {
        try{
            const { userID, authToken } = req.cookies;
            let isAuthorized = await user(userID, authToken, database).isAuthorized();
            const {collectionID} = req.query;

            const permission = await collection(collectionID, database).getPermission(userID);
            // if (!isAuthorized || !permission) {
            //     return res.status(401).json({
            //         error: "Unauthorized action"
            //     });
            // }
            
            const [rows, _] = await database.connection.promise().query("select * from collections where id = ?", [collectionID]);
            return res.status(200).json({
                collection: rows[0]
            });
        } catch(err){
            console.log("Could not get collection by id: ", err);
            return res.status(404).json({
                error: "Collection not found"
            })
        }
    });

    app.delete("/remove-collection", async (req, res) => {
        try {
            const { userID, authToken } = req.cookies;
            let isAuthorized = await user(userID, authToken, database).isAuthorized();
            const { collectionID } = req.body
            const ownerID = await collection(collectionID, database).getOwner();

            // isAuthorized = isAuthorized && (ownerID === userID);
            // if (!isAuthorized) {
            //     return res.status(401).json({
            //         error: "Unauthorized action"
            //     });
            // }

            await database.connection.promise().execute(removecollection, [collectionID, ownerID]);
            return res.status(200).json({
                message: "Successfully removed collection"
            });
        } catch (err) {
            console.error("Could not remove collection: ", err);
            return res.status(500).json({
                error: "Could not remove collection"
            });
        }
    });

    app.post("/share-collection-with-user", async(req, res) => {
        try{
            const { userID, authToken } = req.cookies;
            let isAuthorized = await user(userID, authToken, database).isAuthorized();

            const {collectionID, username} = req.body;
            const ownerID = await collection(collectionID, database).getOwner();
            
            // if(ownerID !== userID || !isAuthorized){
            //     return res.status(401).json({
            //         error: "Unauthorized action"
            //     });
            // }

            const [rows, _] = await database.connection.promise().query("select id from user where username = ?", [username]);
            const newUserID = rows[0]["id"];

            await database.connection.promise().execute("insert into collectionAccess values(?, ?)", [newUserID, collectionID]);
            return res.status(200).json({
                message: "Successfully added permission"
            })
        }
        catch(err){
            console.error("Could not share collection with user: ", err);
            return res.status(400).json({
                message: "Could not share collection with user"
            })
        }
    });

    app.get("/search-collections", async(req, res) => {
        try{
            const { userID, authToken } = req.cookies;
            let isAuthorized = await user(userID, authToken, database).isAuthorized();
            
            // if(!isAuthorized){
            //     return res.status(401).json({
            //         error: "Unauthorized action"
            //     });
            // }
            const {search} = req.query;

            const [rows, _] = await database.connection.promise().query("call searchCollections(?, ?)", [userID, search]);

            return res.status(200).json({
                collections: rows[0]
            });
        }
        catch(err){
            console.error("Could not share collection with user: ", err);
            return res.status(400).json({
                message: "Could not share collection with user"
            })
        }
    })

    app.get("/get-collection-info", async(req, res) => {
        try{
            const { userID, authToken } = req.cookies;
            // let isAuthorized = await user(userID, authToken, database).isAuthorized();

            const {collectionID} = req.query;
            // console.log(collectionID);
            let [rows, _] = await database.connection.promise().query("select count(*) as cnt from collectionAccess where userid = ? and collectionid = ?", [userID, collectionID]);

            const cnt = rows[0]["cnt"]
            
            // if(cnt === 0 || !isAuthorized){
            //     return res.status(401).json({
            //         error: "Unauthorized action"
            //     });
            // }

            [rows, _] = await database.connection.promise().query("select * from collections where id = ?", [collectionID]);
            return res.status(200).json({
                collection: rows[0]
            })
        }catch(err){
            console.error("Could not get collection info: ", err);
            return res.status(500).json({});
        }
    })
}