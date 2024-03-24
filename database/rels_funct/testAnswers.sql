create table if not exists testQuestions(
    testID varchar(36) not null,
    studentID char(36) not null,
    answerProblem longtext,
    answerMCQ varchar(2),
    foreign key (testID) references test(id),
    foreign key (studentID) references user(id)
);