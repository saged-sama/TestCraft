delimiter //

create function if not exists addproblem(
    p_subj varchar(20),
    p_topics varchar(255),
    p_probDesc longtext,
    p_solution longtext,
    p_creatorID char(36)
)
returns varchar(36)
deterministic
begin
    declare new_id char(36);
    set new_id = uuid();
    insert into problem(id, subj, topics, probDesc, solution, creatorID, creationTime, lastEdit)
    values (new_id, p_subj, p_topics, p_probDesc, p_solution, p_creatorID, now(), now());
    return new_id;
end //

delimiter ;
