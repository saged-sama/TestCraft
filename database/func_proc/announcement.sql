delimiter //

create procedure if not exists addannouncement(
    in p_title varchar(20),
    in p_post_desc varchar(255),
    in p_isTest boolean,
    in p_creatorID char(36),
    in p_channelID char(36),
    in p_groupID char(36)
)
begin
    insert into announcement(id, title, post_desc, isTest, creatorID, channelID, groupID, creationTime, lastEdit)
    values (uuid(), p_title, p_post_desc, p_isTest, p_creatorID, p_channelID, p_groupID, now(), now());
end //

delimiter ;