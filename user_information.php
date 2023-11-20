<?php

    require 'database.php';

    $response = array();
    $user_id = $_COOKIE['customer_id'];

    $query = "
    SELECT 
        u.Username, u.Email, u.FirstName, u.LastName, u.Gender, 
        IFNULL(SUM(i.amount), 0) AS totalIncome 
    FROM Users u 
    LEFT JOIN Income i ON u.UserID = i.UserID
    WHERE u.UserID = :user_id
    GROUP BY u.UserID
    ";

    $user_info  = $pdo -> prepare($query);
    
    $user_info->execute(['user_id' => $user_id]);
    $result = $user_info -> fetch(PDO::FETCH_ASSOC);

    echo json_encode($result);

?>
