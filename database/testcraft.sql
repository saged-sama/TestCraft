create database if not exists testcraft;
use testcraft;


-- create the entities
source entities/user.sql
source entities/channel.sql
source entities/groups.sql
source entities/announcement.sql
source entities/problem.sql
source entities/mcq.sql
source entities/collections.sql
source entities/test.sql
source entities/advertisement.sql

-- create necessary relationships between the entities
source rels_funct/testQuestions.sql
source rels_funct/testAnswers.sql
source rels_funct/teachers.sql
source rels_funct/students.sql
source rels_funct/assessment.sql
source rels_funct/invitation.sql
source rels_funct/request.sql

-- add functionalities
source func_proc/authentications.sql
source func_proc/user.sql
source func_proc/test.sql
source func_proc/problem.sql
source func_proc/mcq.sql
source func_proc/groups.sql
source func_proc/collections.sql
source func_proc/channel.sql
source func_proc/announcement.sql
source func_proc/advertisement.sql