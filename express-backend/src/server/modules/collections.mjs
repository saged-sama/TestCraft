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
            if (!isAuthorized) {
                return res.status(401).json({
                    error: "Unauthorized action"
                });
            }
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
            const [rows, _] = await database.connection.promise().query('select ownerID from collections where id = ?', [collectionID]);
            const ownerID = rows[0]["ownerID"];

            isAuthorized = isAuthorized && (ownerID === userID);
            if (!isAuthorized) {
                return res.status(401).json({
                    error: "Unauthorized action"
                });
            }

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
            if (!isAuthorized) {
                return res.status(401).json({
                    error: "Unauthorized action"
                });
            }

            const [rows, _] = await database.connection.promise().query(getAllCollectionsByUserId, [userID]);

            return res.status(200).json(rows[0]);
        } catch (err) {
            console.error("Error fetching all collections: ", err);
            return res.status(404).json({
                error: "Could not get collections"
            });
        }
    });

    app.delete("/remove-collection", async (req, res) => {
        try {
            const { userID, authToken } = req.cookies;
            let isAuthorized = await user(userID, authToken, database).isAuthorized();
            const { collectionID } = req.body
            const [rows, _] = await database.connection.promise().query('select ownerID from collections where id = ?', [collectionID]);
            const ownerID = rows[0]["ownerID"];

            isAuthorized = isAuthorized && (ownerID === userID);
            if (!isAuthorized) {
                return res.status(401).json({
                    error: "Unauthorized action"
                });
            }

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
}