<?php

$server = 'https://auth-db1231.hstgr.io/index.php?route=/database/structure&db=u778314228_apptask';
$username='u778314228_sara';
$password='1S2a3r4a';
$database='u778314228_apptask';

try{
    $conn = new PDO("mysql:host=$server;dbname=$database;",$username,$password);

}catch(PDOException $e){
    die('Connection failed: '.$e->getMessage());
}

?>