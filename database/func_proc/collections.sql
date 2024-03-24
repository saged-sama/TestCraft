delimiter //

create procedure if not exists addcollection(
    in p_collectionName varchar(100),
    in p_ownerID char(36),
    in p_channelID char(36)
)
begin
    insert into collections(id, collectionName, ownerID, channelID, dateCreated, lastUpdate)
    values (uuid(), p_collectionName, p_ownerID, p_channelID, now(), now());
end //

delimiter ;