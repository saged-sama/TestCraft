create database if not exists testcraft;
use testcraft;

-- create the entities
source entities/user.sql
source entities/problem.sql
source entities/collections.sql
source entities/subjects.sql
source entities/channel.sql
source entities/groups.sql
source entities/test.sql
source entities/announcement.sql
source entities/advertisement.sql

-- add functionalities
source func_proc/authentications.sql
source func_proc/user.sql
source func_proc/collections.sql
source func_proc/problem.sql
source func_proc/channel.sql
source func_proc/groups.sql
source func_proc/test.sql
source func_proc/announcement.sql
source func_proc/advertisement.sql

-- create necessary relationships between the entities
source rels_funct/collectionProblems.sql
source rels_funct/collectionAccess.sql
source rels_funct/channelAccess.sql
source rels_funct/groupAccess.sql
source rels_funct/students.sql
source rels_func/teachers.sql
source rels_func/testAnswers.sql
source rels_func/testQuestions.sql
source rels_func/request.sql
source rels_func/invitation.sql
