create table if not exists authentications(
    userid char(36) not null primary key,
    authToken varchar(108) not null,
    expireTime datetime,
    foreign key (userid) references user(id) on delete cascade
);

create index auth_index on authentications (userid);

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
    declare timenow datetime;
    declare expiredatetime datetime;

    select psswrd into hashed_pass from user where username = p_username;
    select id into useridentity from user where username = p_username;
    set timenow = now();

    if substring(hashed_pass, 1, 4) = expected_prefix then
        set salt = substring(hashed_pass, 1, 7);

        if hashed_pass = concat(salt, SHA2(concat(salt, p_password), 512)) then
            select expireTime into expiredatetime from authentications where userid = useridentity;

            if expiredatetime < timenow then
                set token = concat(uuid(), uuid(), uuid());
                update authentications set authToken = token, expireTime = date_add(now(), interval 15 day) where userid = useridentity;
            else
                select authToken into token from authentications where userid = useridentity;
            end if;

            set jsonRet = concat('{"userID": "', useridentity, '",');
            set jsonRet = concat(jsonRet, '"authToken": "', token, '"}');
            return jsonRet;
        else
            return "0";
        end if;
    else
        return "0";
    end if;
end//

delimiter ;

delimiter //

create function if not exists isAuthenticated(
    p_userid char(36),
    p_authToken char(108)
)
returns int
deterministic
begin
    declare cnt int;

    select count(*) into cnt from authentications where userid = p_userid and authToken = p_authToken and expireTime > now();

    return cnt;
end //

delimiter ;