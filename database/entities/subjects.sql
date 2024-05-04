create table if not exists subjects(
    id char(36) unique,
    paper int,
    title varchar(50),
    primary key(id, paper, title),
    unique (paper, title)
);

insert into subjects values
    (uuid(), 0, "Bangla"),
    (uuid(), 1, "Bangla"),
    (uuid(), 2, "Bangla"),
    (uuid(), 0, "Mathematics"),
    (uuid(), 1, "Mathematics"),
    (uuid(), 2, "Mathematics"),
    (uuid(), 0, "Physics"),
    (uuid(), 1, "Physics"),
    (uuid(), 2, "Physics"),
    (uuid(), 0, "Chemistry"),
    (uuid(), 1, "Chemistry"),
    (uuid(), 2, "Chemistry"),
    (uuid(), 0, "Biology"),
    (uuid(), 1, "Biology"),
    (uuid(), 2, "Biology"),
    (uuid(), 0, "ICT"),
    (uuid(), 1, "ICT"),
    (uuid(), 2, "ICT"),
    (uuid(), 0, "English"),
    (uuid(), 1, "English"),
    (uuid(), 2, "English");