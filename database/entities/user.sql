create table if not exists user(
    id char(36) not null primary key,
    username varchar(50) not null unique,
    psswrd varchar(255) not null,
    email varchar(100) not null unique,
    phone varchar(20) not null unique,
    dateCreated datetime not null
);

create table if not exists userDetails(
    userid char(36) not null,
    usersName text,
    userAddress text,
    birthdate datetime,
    education text,
    maxQualification varchar(20),
    jobTitle varchar(20),
    workplace text,
    profilepicture varchar(255),
    about longtext,
    experience longtext,
    foreign key (userid) references user(id) on delete cascade
);