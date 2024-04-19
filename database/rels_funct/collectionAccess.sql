create table if not exists CollectionAccess(
    userid char(36) not null,
    collectionID char(36) not null,
    foreign key (userid) references user(id) on delete cascade,
    foreign key (collectionID) references collections(id) on delete cascade
);

create index collection_access on CollectionAccess(userid);