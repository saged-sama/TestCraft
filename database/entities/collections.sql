create table if not exists collections(
    id char(36) not null primary key,
    collectionName text,
    ownerID char(36) not null,
    dateCreated datetime,
    lastUpdate datetime,
    foreign key (ownerID) references user(id) on delete cascade
);
