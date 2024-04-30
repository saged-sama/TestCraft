export default function collection(collectionID, database){

    const getOwner = async () => {
        const [rows, __] = await database.connection.promise().query("select ownerid from collections where id = ?", [collectionID]);
        const ownerID = rows[0]["ownerid"];
        return ownerID;
    }

    const getPermission = async (userid) => {
        const [rows, _] = await database.connection.promise().query("select count(*) as cnt from collectionAccess where collectionid = ? and userid = ?", [collectionID, userid]);
        const cnt = rows[0]["cnt"];
        return cnt > 0;
    }

    return {getOwner, getPermission};
}