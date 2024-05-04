create table if not exists problem(
    id char(36) not null primary key,
    subj char(36),
    topics varchar(255),
    probDesc longtext not null,
    solution longtext,
    creatorID char(36),
    creationTime datetime,
    lastEdit datetime,
    foreign key (creatorID) references user(id) on delete set null,
    foreign key (subj) references subjects(id) on delete set null
);