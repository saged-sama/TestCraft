delimiter //

create procedure if not exists addproblem(
    in p_subj varchar(20),
    in p_topics varchar(255),
    in p_probDesc longtext,
    in p_solution longtext,
    in p_creatorID char(36)
)
begin
    insert into problem(id, subj, topics, probDesc, solution, creatorID, creationTime, lastEdit)
    values (uuid(), p_subj, p_topics, p_probDesc, p_solution, p_creatorID, now(), now());
end //

delimiter ;