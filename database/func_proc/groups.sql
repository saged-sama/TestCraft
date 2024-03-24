delimiter //

create procedure if not exists addgroup(
    in p_groupName varchar(20),
    in p_groupPhoto varchar(255),
    in p_channelID char(36),
    in p_creatorID char(36)
)
begin
    insert into grp(id, groupName, groupPhoto, channelID, creatorID, dateCreated)
    values (uuid(), p_groupName, p_groupPhoto, p_channelID, p_creatorID, now());
end//

delimiter ;