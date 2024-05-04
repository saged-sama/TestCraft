delimiter //

create procedure if not exists addchannel(
    in p_name varchar(20),
    in p_channelOwner char(36)
)
begin
    declare newChannelID char(36);
    set newChannelID = uuid();

    insert into channel(id, channelName, channelOwner, dateCreated)
    values(newChannelID, p_name, p_channelOwner, now());

    insert into channelAccess values(p_channelOwner, newChannelID);
end//

delimiter ;

delimiter //

create procedure if not exists getAllChannelsByUserID(
    in p_userID char(36)
)
begin
    select
        ca.channelID,
        c.channelName,
        u.usersName as ownerName,
        c.dateCreated as createdOn
    from channelAccess as ca
    join channel as c
        on ca.channelID = c.id
    join userDetails as u
        on ca.userID = u.userid
    where ca.userID = p_userID
    order by c.dateCreated desc;
end //

delimiter ;