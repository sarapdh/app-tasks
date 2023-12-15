<?php
require './app-db.php';

$tasks = array();

$stmt = $conn->prepare("SELECT * FROM tasks ORDER BY id DESC LIMIT 1");
if($stmt->execute()){
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        array_push($tasks, $row);
    }
    $message = 'success';
    $data = array('message' => $message, 'task' => $tasks);
    echo json_encode($data);
}else{
    $message = 'error';
    $data = array('message'=> $message);
    echo json_encode($data);
}

?>