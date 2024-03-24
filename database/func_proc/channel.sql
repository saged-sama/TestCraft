delimiter //

create procedure if not exists addchannel(
    in p_name varchar(20),
    in p_channelOwner char(36)
)
begin
    insert into channel(id, channelName, channelOwner, dateCreated)
    values(uuid(), p_name, p_channelOwner, now());
end//

delimiter ;