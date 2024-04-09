export default async function isAuthenticated(authInfo, database){
    try{
        const { userID, authToken } = authInfo;
        const isAuthed = 'select isAuthenticated(?, ?) as authed';
        const [rows, _] = await database.connection.promise().query(isAuthed, [userID, authToken]);
        const authed = rows[0]["authed"];
        return authed > 0;
    } catch(err){
        console.error("Could not check authentication: ", err);
        return false;
    }
}