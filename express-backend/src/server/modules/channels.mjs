import user from "../objects/user.mjs";

export default function channels(app, database){
        const addchannel = 'call addchannel(?, ?)';
        const removechannel = 'call removechannel(?)';
        const channelowner = 'select channelOwner from channel where id = ?';

        // Add channel
        app.put("/add-channel", async (req, res) => {
            try{
                const { userID, authToken } = req.cookies;
                const isAuthorized = await user(userID, authToken, database).isAuthorized();
                // console.log(isAuthorized);
                if(!isAuthorized){
                    return res.status(401).json({
                        error: "Could not add the channel"
                    });
                }
                const { channelName, ownerID } = req.body;
                await database.connection.promise().execute(addchannel, [channelName, ownerID]);
                return res.status(200).json({
                    message: "Channel added successfully"
                });
            } catch(err) {
                console.error("Error adding channel: ", err);
                return res.status(500).json({
                    error: "Could not add the channel"
                });
            }
        });

        app.delete("/delete-channel", async (req, res) => {
            try{
                const { userID, authToken } = req.cookies;
                let isAuthorized = await  user(userID, authToken, database).isAuthorized();
                const { channelid } = req.body;
                const [rows, _] = await database.connection.promise().query(channelowner, [channelid]);
                const ownerID = rows[0]["channelOwner"];

                isAuthorized = isAuthorized && (ownerID === userID);

                if(!isAuthorized) {
                    return res.status(401).json({
                        error: "Could not delete the channel"
                    });
                }
                await database.connection.promise().execute(removechannel, [channelid]);
                return res.status(200).json({
                    message: "Successfully deleted channel"
                });
            } catch(err){
                console.error("Could not delete the channel: ", err);
                return res.status(500).json({
                    error: "Channel deletion unsuccessful"
                });
            }
        });
    }