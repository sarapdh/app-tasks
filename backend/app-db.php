<?php

$server = 'localhost';
$username='root';
$password='';
$database='tasks';

try{
    $conn = new PDO("mysql:host=$server;dbname=$database;",$usename,$password);

}catch(PDOException $e){
    die('Connection failed: '.$e->getMessage());
}

?>