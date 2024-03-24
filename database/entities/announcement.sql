create table if not exists announcement(
    id char(36) not null primary key,
    title varchar(100) not null,
    post_desc longtext not null,
    isTest boolean not null,
    creatorID char(36) not null,
    channelID char(36) not null,
    groupID char(36),
    creationTime datetime,
    lastEdit datetime,
    foreign key (creatorID) references user(id),
    foreign key (channelID) references channel(id),
    foreign key (groupID) references grp(id)
);

