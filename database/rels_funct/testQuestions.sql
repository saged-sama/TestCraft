create table if not exists testQuestions(
    testid varchar(36) not null,
    problemid varchar(36),
    marks int,
    foreign key (testid) references test(id),
    foreign key (problemid) references problem(id)
);