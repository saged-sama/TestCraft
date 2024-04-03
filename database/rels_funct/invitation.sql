create table if not exists invitation(
    userID char(36) not null,
    inviter char(36) not null,
    channelID char(36) not null,
    foreign key (userID) references user(id),
    foreign key (inviter) references user(id),
    foreign key (channelID) references channel(id)
);