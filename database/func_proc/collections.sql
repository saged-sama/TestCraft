delimiter //

create procedure if not exists addcollection(
    in p_collectionName text,
    in p_ownerID char(36)
)
begin
    declare collID char(36);
    set collID = uuid();

    insert into collections(id, collectionName, ownerID, dateCreated, lastUpdate)
    values (collID, p_collectionName, p_ownerID, now(), now());

    insert into CollectionAccess(userid, collectionID)
    values(p_ownerID, collID);
end //

delimiter ;

delimiter //

create procedure if not exists removecollection(
    in p_collectionID char(36),
    in p_ownerID char(36)
)
begin
    delete from collections where id = p_collectionID and ownerID = p_ownerID;
end //

delimiter ;

delimiter //

create procedure if not exists getAllCollectionsByUserID(
    in p_userID char(36)
)
begin
    select
        ca.collectionID,
        c.collectionName,
        u.usersName as ownerName,
        c.dateCreated as createdOn,
        c.lastUpdate as lastModified 
    from CollectionAccess as ca
    join collections as c
        on ca.collectionID = c.id
    join userDetails as u
        on ca.userID = u.userid
    where ca.userID = p_userID
    order by c.dateCreated desc;
end //

delimiter ;


delimiter //

create procedure if not exists searchCollections(
    in p_userID char(36),
    in p_search longtext
)
begin
    select 
        ca.collectionID,
        c.collectionName,
        u.usersName as ownerName,
        c.dateCreated as createdOn,
        c.lastUpdate as lastModified 
    from 
        CollectionAccess as ca
    join 
        collections as c on ca.collectionID = c.id
    join 
        userDetails as u on ca.userID = u.userid
    where 
        ca.userID = p_userID
        and (c.collectionName like concat('%', p_search, '%') or u.usersName like concat('%', p_search, '%'))
    order by c.dateCreated desc;

end //

delimiter ;