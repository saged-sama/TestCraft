create table collectionProblems(
    collectionID char(36) not null,
    problemID char(36) not null,
    addedBy char(36) not null,
    foreign key (collectionID) references collections(id) on delete cascade,
    foreign key (problemID) references problem(id) on delete cascade,
    foreign key (addedBy) references user(id) on delete cascade
);