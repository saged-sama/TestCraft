create table if not exists groupAccess(
    userID char(36),
    groupID char(36),
    foreign key (userID) references user(id) on delete cascade,
    foreign key (groupID) references grp(id) on delete cascade
);