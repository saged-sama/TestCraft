create table if not exists channel(
    id varchar(36) not null primary key,
    name varchar(20)
);

delimiter //

create procedure if not exists addchannel(
    in p_name varchar(20)
)
begin
    insert into channel(id, name)
    values(uuid(), p_name);
end//

delimiter ;