delimiter //

create procedure if not exists addmcq(
    in p_subj varchar(20),
    in p_topics varchar(255),
    in p_mcqDesc longtext,
    in p_options text,
    in p_solution longtext,
    in p_creatorID char(36)
)
begin
    insert into mcq(id, subj, topics, mcqDesc, options, solution, creatorID, creationTime, lastEdit)
    values (uuid(), p_subj, p_topics, p_mcqDesc, p_options, p_solution, p_creatorID, now(), now());
end //

delimiter ;