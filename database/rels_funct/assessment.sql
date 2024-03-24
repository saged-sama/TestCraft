create table if not exists assessment(
    testID varchar(36) not null,
    teacherID varchar(36) not null,
    studentID varchar(36) not null,
    assessment longtext,
    marks int,
    foreign key (testID) references test(id),
    foreign key (teacherID) references user(id),
    foreign key (studentID) references user(id)
);