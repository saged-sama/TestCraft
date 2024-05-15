import user from "../objects/user.mjs";
import channel from "../objects/channel.mjs";

export default function channels(app, database) {
    const addchannel = 'call addchannel(?, ?)';
    const removechannel = 'call removechannel(?)';
    const channelowner = 'select channelOwner from channel where id = ?';

    app.get("/get-channels", async (req, res) => {
        try {
            const { userID, authToken } = req.cookies;
            // console.log(userID);
            const isAuthorized = await user(userID, authToken, database).isAuthorized();

            if (!isAuthorized) {
                return res.status(401).json({
                    error: "Could not add the channel"
                });
            }

            const [rows, _] = await database.connection.promise().query("call getAllChannelsByUserID(?)", [userID]);
            // console.log(rows[0]);
            return res.status(200).json({
                channels: rows[0]
            });
        } catch (err) {
            console.error("Could not get channels: ", err);
            return res.status(500).json({
                message: "Could not get channels"
            });
        }
    });

    // Add channel
    app.post("/add-channel", async (req, res) => {
        try {
            const { userID, authToken } = req.cookies;
            const isAuthorized = await user(userID, authToken, database).isAuthorized();

            if (!isAuthorized) {
                return res.status(401).json({
                    error: "Could not add the channel"
                });
            }
            const { channelName } = req.body;
            await database.connection.promise().execute(addchannel, [channelName, userID]);
            return res.status(200).json({
                message: "Channel added successfully"
            });
        } catch (err) {
            console.error("Error adding channel: ", err);
            return res.status(500).json({
                error: "Could not add the channel"
            });
        }
    });

    app.delete("/delete-channel", async (req, res) => {
        try {
            const { userID, authToken } = req.cookies;
            let isAuthorized = await user(userID, authToken, database).isAuthorized();
            const { channelid } = req.body;
            const [rows, _] = await database.connection.promise().query(channelowner, [channelid]);
            const ownerID = rows[0]["channelOwner"];

            isAuthorized = isAuthorized && (ownerID === userID);

            if (!isAuthorized) {
                return res.status(401).json({
                    error: "Could not delete the channel"
                });
            }
            await database.connection.promise().execute(removechannel, [channelid]);
            return res.status(200).json({
                message: "Successfully deleted channel"
            });
        } catch (err) {
            console.error("Could not delete the channel: ", err);
            return res.status(500).json({
                error: "Channel deletion unsuccessful"
            });
        }
    });

    app.get("/get-all-channels", async (req, res) => {
        try {
            const { userID, authToken } = req.cookies;
            // console.log(userID);
            const isAuthorized = await user(userID, authToken, database).isAuthorized();

            if (!isAuthorized) {
                return res.status(401).json({
                    error: "Could not get all the channel"
                });
            }

            const [rows, _] = await database.connection.promise().query("select * from channel");
            // console.log(rows[0]);
            return res.status(200).json({
                channels: rows
            });
        } catch (err) {
            console.error("Could not get channels: ", err);
            return res.status(500).json({
                message: "Could not get channels"
            });
        }
    });

    app.get("/get-channel-details", async (req, res) => {
        try {
            const { userID, authToken } = req.cookies;
            let isAuthorized = await user(userID, authToken, database).isAuthorized();
            // console.log(req.query);
            const { channelID } = req.query;
            let [rows, _] = await database.connection.promise().query("select count(*) as cnt from channelaccess where channelid = ? and userid = ?", [channelID, userID]);
            const cnt = rows[0]["cnt"];
            // console.log(channelID, userID);

            isAuthorized = isAuthorized && (cnt > 0);

            if (!isAuthorized) {
                return res.status(401).json({
                    error: "Unauthorized action"
                });
            }
            let channelDetails = await channel(channelID, database).getChannalDetails();
            // console.log("Paisi: ", channelDetails);

            [rows, _] = await database.connection.promise().query(
                `select id as groupID, groupName from grp where channelID = ?`, [channelID]
            );
            channelDetails.groups = rows;

            const teachers = await channel(channelID, database).getTeachers();
            const students = await channel(channelID, database).getStudents();

            channelDetails.teachers = teachers;
            channelDetails.students = students;

            // console.log(channelDetails);

            return res.status(200).json({
                channelDetails: channelDetails
            });
        } catch(err){
            console.error("Could not get channel details: ", err);
            return res.status(500).json({
                message: "Could not get channel details"
            });
        }
    });

    app.post("/add-group", async(req, res) => {
        try{
            const { userID, authToken } = req.cookies;
            let isAuthorized = await user(userID, authToken, database).isAuthorized();
            // console.log(req.query);
            const { channelID, groupName } = req.body;
            let [rows, _] = await database.connection.promise().query("select count(*) as cnt from channelaccess where channelid = ? and userid = ?", [channelID, userID]);
            const cnt = rows[0]["cnt"];
            // console.log(channelID, userID);

            isAuthorized = isAuthorized && (cnt > 0);

            if (!isAuthorized) {
                return res.status(401).json({
                    error: "Unauthorized action"
                });
            }
            await database.connection.promise().execute(`call addgroup(?, ?, ?, ?)`, [groupName, "", channelID, userID]);
            return res.status(201).json({
                message: "successfully created new group"
            });
        }
        catch(err){
            console.error("Could not add new group");
            return res.status(500).json({
                message: "Could not add new group"
            })
        }
    });

    app.get("/get-groups", async (req, res) => {
        try{
            const { userID, authToken } = req.cookies;
            let isAuthorized = await user(userID, authToken, database).isAuthorized();
            // console.log(req.query);
            const { channelID } = req.query;
            let [rows, _] = await database.connection.promise().query("select count(*) as cnt from channelaccess where channelid = ? and userid = ?", [channelID, userID]);
            const cnt = rows[0]["cnt"];
            // console.log(channelID, userID);

            isAuthorized = isAuthorized && (cnt > 0);

            if (!isAuthorized) {
                return res.status(401).json({
                    error: "Unauthorized action"
                });
            }

            [rows, _] = await database.connection.promise().query(`
                select 
                u.usersName as createdBy, 
                g.userid as creatorID, 
                g.groupid,
                gr.groupName,
                gr.dateCreated as createdOn
                from groupAccess g
                join userDetails u
                on g.userid = u.userid
                join grp gr
                on g.groupid = gr.id
                where g.userid = ? and gr.channelID = ?`, [userID, channelID]);
            
            return res.status(201).json({
                groups: rows
            });
        }
        catch(err){
            console.error("Could not add new group");
            return res.status(500).json({
                message: "Could not add new group"
            })
        }
    });

    app.post("/add-announcements", async(req, res) => {
        try{
            const { userID, authToken, channelID, groupID, title, isTest, description } = req.body;
            let isAuthorized = await user(userID, authToken, database).isAuthorized();
            // console.log(req.query);
            let [rows, _] = await database.connection.promise().query("select count(*) as cnt from channelaccess where channelid = ? and userid = ?", [channelID, userID]);
            const cnt = rows[0]["cnt"];
            let cnt2 = 1;
            if(groupID !== "0"){
                [rows, _] = await database.connection.promise().query("select count(*) as cnt from groupAccess where groupid = ? and userid = ?", [groupID, userID]);
                cnt2 = rows[0]["cnt"];
            }

            isAuthorized = isAuthorized && (cnt > 0) && (cnt2 > 0);

            if (!isAuthorized) {
                return res.status(401).json({
                    error: "Unauthorized action"
                });
            }

            let sql = "";
            if(groupID !== "0") {
                sql = `insert into announcement(id, title, post_desc, isTest, creatorID, channelID, groupID, creationTime, lastEdit)
                values(uuid(), "${title}", "${description}", "${isTest}", "${userID}", "${channelID}", , "${groupID}", now(), now())`;
            }
            else{
                sql = `insert into announcement(id, title, post_desc, isTest, creatorID, channelID, creationTime, lastEdit)
                values(uuid(), "${title}", "${description}", "${isTest}", "${userID}", "${channelID}", now(), now())`;
            }

            await database.connection.promise().execute(sql, []);
            return res.status(200).json({
                message: "Added announcement"
            });

        }catch(err){
            console.error("Could not get announcements: ", err);
            return res.status(500).json({
                message: "Could not get announcements"
            });
        }
    })

    app.get("/get-announcements", async (req, res) => {
        try{
            const { userID, authToken } = req.cookies;
            let isAuthorized = await user(userID, authToken, database).isAuthorized();
            // console.log(req.query);
            const { channelID, groupID, isTest } = req.query;
            let [rows, _] = await database.connection.promise().query("select count(*) as cnt from channelaccess where channelid = ? and userid = ?", [channelID, userID]);
            const cnt = rows[0]["cnt"];
            let cnt2 = 1;
            if(groupID !== "0"){
                [rows, _] = await database.connection.promise().query("select count(*) as cnt from groupAccess where groupid = ? and userid = ?", [groupID, userID]);
                cnt2 = rows[0]["cnt"];
            }

            isAuthorized = isAuthorized && (cnt > 0) && (cnt2 > 0);

            if (!isAuthorized) {
                return res.status(401).json({
                    error: "Unauthorized action"
                });
            }

            let sql = `select
                a.title,
                a.post_desc as description,
                a.isTest,
                a.creationTime as createdOn,
                u.usersName as poster
                from announcement a
                join userDetails u
                on a.creatorID = u.userid 
                where a.isTest = "${isTest}" and a.channelID = "${channelID}"`
            
            
            if(groupID !== "0"){
                sql += ` and a.groupID = "${groupID}"`;
            }

            [rows, _] = await database.connection.promise().query(sql);
            return res.status(200).json({
                announcements: rows
            });

        }catch(err){
            console.error("Could not get announcements: ", err);
            return res.status(500).json({
                message: "Could not get announcements"
            });
        }
    })
}