insert into users 
(username, password, profile_pic)
values
($1, $2, $3);

select * from users
where username = $1