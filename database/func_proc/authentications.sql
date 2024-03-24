create table if not exists authentications(
    userid char(36) not null primary key,
    authToken varchar(108) not null,
    expireTime datetime,
    foreign key (userid) references user(id) on delete cascade
);

-- create index auth_index on authentications (userid);

delimiter //

create function if not exists authenticate(
    p_username varchar(50),
    p_password varchar(255)
)
returns longtext
deterministic
begin
    declare salt char(7);
    declare hashed_pass varchar(255);
    declare expected_prefix char(4) default '$2a$';
    declare token char(108);
    declare useridentity char(36);
    declare jsonRet longtext;

    select psswrd into hashed_pass from user where username = p_username;
    select id into useridentity from user where username = p_username;

    if substring(hashed_pass, 1, 4) = expected_prefix then
        set salt = substring(hashed_pass, 1, 7);
        if hashed_pass = concat(salt, SHA2(concat(salt, p_password), 512)) then
            set token = concat(uuid(), uuid(), uuid());
            update authentications set authToken = token, expireTime = date_add(now(), interval 15 day) where userid = useridentity;
            set jsonRet = concat('{"userID": "', useridentity, '",');
            set jsonRet = concat(jsonRet, '"authTkn": "', token, '"}');
            return jsonRet;
        else
            return "0";
        end if;
    else
        return "0";
    end if;
end//

delimiter ;