export default function channel(channelID, database) {
    const getChannalDetails = async () => {
        const [rows, _] = await database.connection.promise().query(
            `select
            c.channelName, u.usersName as ownerName, c.channelOwner as ownerID, c.dateCreated as createdOn
            from channel c
            join userDetails u
            on c.channelOwner = u.userid
            where c.id = ?`, [channelID]);
        return {
            channelName: rows[0]["channelName"],
            ownerName: rows[0]["ownerName"],
            ownerID: rows[0]["ownerID"],
            createdOn: rows[0]["createdOn"],
        };
    };
    const getTeachers = async() => {
        const [rows, _] = await database.connection.promise().query(
            `select 
            u.usersName as teachername, ca.userid 
            from channelaccess ca 
            join userDetails u 
            on u.userid = ca.userid 
            where ca.channelID = ? and ca.assignedrole = "teacher"`,
            [channelID]
        );
        return rows;
    };
    const getStudents = async() => {
        const [rows, _] = await database.connection.promise().query(
            `select 
            u.usersName as studentname, ca.userid 
            from channelaccess ca 
            join userDetails u on u.userid = ca.userid 
            where ca.channelID = ? and ca.assignedrole = "student"`,
            [channelID]
        );
        return rows;
    }
    return { getChannalDetails, getTeachers, getStudents };
}