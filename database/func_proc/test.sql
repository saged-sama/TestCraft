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
    in p_groupID char(36)
)
begin
    insert into test(id, title, subj, topics, startTime, endTime, totalMarks, creatorID, channelID, groupID, creationTime)
    values (uuid(), p_title, p_subj, p_topics, STR_TO_DATE(p_startTime, '%Y-%m-%d %H:%i:%s'), STR_TO_DATE(p_endTime, '%Y-%m-%d %H:%i:%s'), p_totalMarks, p_creatorID, p_channelID, p_groupID, now());
end //

delimiter ;

delimiter //

create function addtestfunc(
    p_title varchar(20),
    p_subj varchar(20),
    p_topics varchar(255),
    p_startTime char(19),
    p_endTime char(19),
    p_totalMarks int,
    p_creatorID char(36),
    p_channelID char(36),
    p_groupID char(36)
) 
returns char(36)
deterministic
begin
    declare new_uuid char(36);
    set new_uuid = uuid();
    insert into test(id, title, subj, topics, startTime, endTime, totalMarks, creatorID, channelID, groupID, creationTime)
    values (new_uuid, p_title, p_subj, p_topics, STR_TO_DATE(p_startTime, '%Y-%m-%dT%H:%i:%s'), STR_TO_DATE(p_endTime, '%Y-%m-%dT%H:%i:%s'), p_totalMarks, p_creatorID, p_channelID, p_groupID, now());
    return new_uuid;
end //

delimiter ;
