-- create the users table and the posts table
create table users (
    id serial primary key,
    username text,
    password varchar(20)
    profile_pic varchar(200)
);

create table posts (
    post_id serial primary key,
    user_id int references users(id),
    content varchar(400),
    created date 
);


-- Update the password column on your users table from datatype VARCHAR(20) to datatype TEXT using an ALTER TABLE command.
alter table users
alter password
type text;