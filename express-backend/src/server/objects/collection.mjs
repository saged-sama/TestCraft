export default function collection(collectionID, database){

    const getOwner = async () => {
        const [rowOwner, __] = await database.connection.promise().query("select ownerid from collections where id = ?", [collectionID]);
        const ownerID = rowOwner[0]["ownerid"];
        return ownerID;
    }

    return {getOwner};
}