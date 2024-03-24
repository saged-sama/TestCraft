create table if not exists teachers(
    channelID varchar(36) not null,
    teacherID varchar(36) not null,
    foreign key (channelID) references channel(id),
    foreign key (teacherID) references user(id)
);