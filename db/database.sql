create database companydb;

use database;

CREATE TABLE employee(

    id int (11) not null auto_increment,
    name varchar (45) default null,
    salary int(5) default null,
    primary key (id)
);

describe employee;

insert into employee  values 
(1, 'joe',  1000),
(2, 'Maria',  1000),
(3, 'Isabel',  1000),
(4, 'Laura',  1000),
(5, 'Thomas',  1000);


