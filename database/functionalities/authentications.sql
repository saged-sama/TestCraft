create table if not exists authentications(
    userid varchar(36) not null primary key,
    authToken varchar(108) not null,
    expireTime datetime,
    foreign key (userid) references user(id)
);

delimiter //

create function if not exists authenticate(
    p_username varchar(50),
    p_password varchar(255)
)
returns varchar(108)
deterministic
begin
    declare salt char(29);
    declare hashed_pass varchar(255);
    declare expected_prefix char(4) default '$2a$';
    declare token varchar(108);
    declare useridentity varchar(36);

    select psswrd into hashed_pass from user where username = p_username;
    select id into useridentity from user where username = p_username;

    if substring(hashed_pass, 1, 4) = expected_prefix then
        set salt = substring(hashed_pass, 1, 7);
        if hashed_pass = concat(salt, SHA2(concat(salt, p_password), 512)) then
            set token = concat(uuid(), uuid(), uuid());
            update authentications set authToken = token, expireTime = date_add(now(), interval 30 day) where userid = useridentity;
            return token;
        else
            return "0";
        end if;
    else
        return "0";
    end if;
end//

delimiter ;