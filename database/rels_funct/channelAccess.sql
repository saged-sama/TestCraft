create table if not exists channelAccess(
    userID char(36),
    channelID char(36),
    assignedrole varchar(10),
    foreign key (userID) references user(id) on delete cascade,
    foreign key (channelID) references channel(id) on delete cascade
);