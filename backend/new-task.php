<?php
require './app-db.php';

$_post = json_decode(file_get_contents('php://input'), true);

$title = $_post['title'];
$descr = $_post['descr'];
date_default_timezone_set('Europe/London');
$date = date("Y-m-d");

$stmt = $conn->prepare("INSERT INTO tasks (title_task, descr_task, date_task) VALUES (:title_task, :descr_task, :date_task");
$stmt->bindParam(':title_task', $title);
$stmt->bindParam(':descr_task', $descr);
$stmt->bindParam(':date_task', $date);

if ($stmt->execute()) {
    $message = 'success';
    $data = array('message' => $message,'title' => $title, 'descr'=> $descr,'date'=> $date);
    echo json_encode($data);
}else{
    $message = 'error';
    $data = array('message'=> $message);
    echo json_encode($data);
}



?>