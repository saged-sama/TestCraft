create table if not exists students(
    channelID varchar(36) not null,
    groupID varchar(36),
    studentID varchar(36) not null,
    foreign key (channelID) references channel(id),
    foreign key (groupID) references grp(id),
    foreign key (studentID) references user(id)
);