CREATE USER 'cubeexchange'@'%' IDENTIFIED WITH mysql_native_password BY 'cubeexchangewas@!';
CREATE DATABASE cubeexchange;

GRANT ALL ON cubeexchange.* TO 'cubeexchange'@'%';

FLUSH PRIVILEGES;