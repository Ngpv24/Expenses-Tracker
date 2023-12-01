<?php

    require 'database.php';

    $response = array();
    $user_id = $_COOKIE['customer_id'];

    $query = "
    SELECT 
        Username, Email, FirstName, LastName, Gender
        FROM Users WHERE UserID = :user_id
 
    ";

    $user_info  = $pdo -> prepare($query);
    
    $user_info->execute(['user_id' => $user_id]);
    $result = $user_info -> fetch(PDO::FETCH_ASSOC);

    echo json_encode($result);

?>
