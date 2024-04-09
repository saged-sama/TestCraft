delimiter //

create function if not exists addcollection(
    p_collectionName text,
    p_ownerID char(36)
)
returns char(36)
deterministic
begin
    declare collID char(36);
    set collID = uuid();
    insert into collections(id, collectionName, ownerID, dateCreated, lastUpdate)
    values (collID, p_collectionName, p_ownerID, now(), now());
    return collID;
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

-- delimiter //

-- create procedure if not exists getcollbynameuserid(
--     in p_collectionID
-- )

-- delimiter ;