create database if not exists testcraft;
use testcraft;

-- create the entities
source entities/user.sql
source entities/collections.sql
source entities/problem.sql

-- create necessary relationships between the entities
source rels_funct/collectionProblems.sql
source rels_funct/collectionAccess.sql

-- add functionalities
source func_proc/authentications.sql
source func_proc/user.sql
source func_proc/collections.sql
source func_proc/problem.sql