create table if not exists mcq(
    id char(36) not null primary key,
    subj varchar(20) not null,
    topics varchar(255) not null,
    mcqDesc longtext not null,
    options text not null,
    solution longtext,
    creatorID char(36),
    creationTime datetime,
    lastEdit datetime,
    foreign key (creatorID) references user(id) on delete set null
);