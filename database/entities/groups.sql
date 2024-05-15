create table if not exists grp(
    id char(36) not null primary key,
    groupName varchar(50),
    groupPhoto varchar(255),
    channelID char(36) not null,
    creatorID char(36) not null,
    dateCreated datetime,
    foreign key (channelID) references channel(id) on delete cascade,
    foreign key (creatorID) references user(id) on delete cascade
);