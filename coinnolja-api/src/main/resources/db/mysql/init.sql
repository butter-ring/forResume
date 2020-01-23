CREATE USER 'coinnolja'@'%' IDENTIFIED WITH mysql_native_password BY 'coinnoljawas@!';
CREATE DATABASE coinnolja;

GRANT ALL ON coinnolja.* TO 'coinnolja'@'%';

FLUSH PRIVILEGES;