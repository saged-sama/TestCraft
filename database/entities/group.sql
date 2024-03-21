create table if not exists group(
    id varchar(36) not null primary key,
    name varchar(20) not null unique
);

delimiter //

create procedure if not exists addgroup(
    in p_name varchar(20)
)
begin
    insert into group(id, name)
    values (uuid(), p_name);
end//

delimiter ;