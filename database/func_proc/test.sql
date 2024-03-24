delimiter //

create procedure if not exists addtest(
    in p_title varchar(20),
    in p_subj varchar(20),
    in p_topics varchar(255),
    in p_startTime char(19),
    in p_endTime char(19),
    in p_totalMarks int,
    in p_creatorID char(36),
    in p_channelID char(36),
    in p_groupID char(36),
    in p_announcementID char(36)
)
begin
    insert into problem(id, title, subj, topics, startTime, endTime, totalMarks, creatorID, channelID, groupID, announcementID, creationTime)
    values (uuid(), p_title, p_subj, p_topics, STR_TO_DATE(p_startTime, '%Y-%m-%d %H:%i:%s'), STR_TO_DATE(p_endTime, '%Y-%m-%d %H:%i:%s'), p_totalMarks, p_creatorID, p_channelID, p_groupID, p_announcementID, now());
end //

delimiter ;