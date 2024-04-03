create table if not exists request(
    userID char(36) not null,
    approver char(36) not null,
    channelID char(36) not null,
    foreign key (userID) references user(id),
    foreign key (approver) references user(id),
    foreign key (channelID) references channel(id)
);