create table if not exists test(
    id char(36) not null primary key,
    title varchar(20) not null,
    subj varchar(20) not null,
    topics varchar(255) not null,
    startTime datetime not null,
    endTime datetime not null,
    totalMarks int,
    creatorID char(36) not null,
    channelID char(36) not null,
    groupID char(36),
    creationTime datetime,
    foreign key (creatorID) references user(id),
    foreign key (channelID) references channel(id),
    foreign key (groupID) references grp(id)
);

alter table test
add constraint chk_test_duration
check(endTime > startTime);