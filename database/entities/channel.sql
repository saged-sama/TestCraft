create table if not exists channel(
    id char(36) not null primary key,
    channelName varchar(20),
    channelOwner char(36) not null,
    dateCreated datetime,
    foreign key (channelOwner) references user(id) on delete cascade
);