create table if not exists advertisement(
    id char(36) not null primary key,
    headline varchar(50) not null,
    subtitle varchar(50) not null,
    background varchar(255) not null,
    channelID char(36) not null,
    creationTime datetime,
    lastUpdateTime datetime,
    foreign key (channelID) references channel(id)
);
