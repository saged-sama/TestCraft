delimiter //

create procedure if not exists addadvertisement(
    in p_headline varchar(50),
    in p_subtitle varchar(50),
    in p_background varchar(255),
    in p_channelID char(36)
)
begin
    insert into problem(id, headline, subtitle, background, channelID, creationTime, lastUpdateTime)
    values (uuid(), p_headline, p_subtitle, p_background, p_channelID, now(), now());
end //

delimiter ;