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
    declare newUserID char(36);
    declare newAuthToken char(108);
    declare newExpDate datetime;

    set salt = concat('$2a$', lpad(floor(rand()*30 + 1), 2, '0'), '$');
    set hashed_pass = concat(salt, SHA2(concat(salt, p_password), 512));

    set newUserID = uuid();
    set newAuthToken = concat(uuid(), uuid(), uuid());
    set newExpDate = date_add(now(), interval 15 day);

    insert into user(id, username, psswrd, email, phone, dateCreated)
    values(newUserID, p_username, hashed_pass, p_email, p_phone, now());

    insert into userDetails(userid, usersName) values(newUserID, "[No Name]");

    insert into authentications(userid, authToken, expireTime)
    values(newUserID, newAuthToken, newExpDate);
end //

delimiter ;