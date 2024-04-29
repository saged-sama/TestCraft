export default function user(userID, authToken, database){

    async function isAuthorized() {
        try{
            const isAuthed = 'select isAuthenticated(?, ?) as authed';
            const [rows, _] = await database.connection.promise().query(isAuthed, [userID, authToken]);
            const authed = rows[0]["authed"];
            return authed > 0;
        } catch(err){
            console.error("Could not check authentication: ", err);
            return false;
        }
    }

    async function getUserDetails(){
        try{
            const getUser = "select u.username, u.email, u.phone, ud.* from user u join userDetails ud on u.id = ud.userid where u.id = ?";
            const [rows, _] = await database.connection.promise().query(getUser, [userID]);
            console.log(rows[0]);
            return rows[0];
        } catch(err){
            console.error("Could not check userDetails: ", err);
            return {};
        }
    }

    // async updateUserDetails(update, database){
    //     try{
    //         const 
    //     }
    // }
    return { isAuthorized, getUserDetails };
};