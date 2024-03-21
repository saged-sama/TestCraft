create table if not exists user(
    id varchar(36) not null primary key,
    username varchar(50) not null unique,
    psswrd varchar(255) not null,
    email varchar(100) not null unique,
    phone varchar(20) not null unique
);

delimiter //

create procedure if not exists adduser(
    in p_username varchar(50),
    in p_password varchar(255),
    in p_email varchar(100),
    in p_phone varchar(20)
)
begin
    declare salt char(16);
    declare hashed_pass varchar(255);
    declare newuserID varchar(36);
    declare newAuthToken varchar(108);
    declare newExpDate datetime;

    set salt = concat('$2a$', lpad(floor(rand()*30 + 1), 2, '0'), '$');
    set hashed_pass = concat(salt, SHA2(concat(salt, p_password), 512));
    set newuserID = uuid();
    set newAuthToken = concat(uuid(), uuid(), uuid());
    set newExpDate = date_add(now(), interval 30 day);

    insert into user(id, username, psswrd, email, phone)
    values(newuserID, p_username, hashed_pass, p_email, p_phone);

    insert into authentications(userid, authToken, expireTime) values(newuserID, newAuthToken, newExpDate);
end//

delimiter ;