<?php

    include("database.php");

    $user_id = $_COOKIE['customer_id'];

    $query = "
    SELECT 
        (SELECT IFNULL(SUM(Amount), 0) FROM income WHERE UserID = :user_id1) AS totalIncome,
        (SELECT IFNULL(SUM(Amount), 0) FROM expenses WHERE UserID = :user_id2) AS totalExpenses
    ";

    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':user_id1', $user_id, PDO::PARAM_INT);
    $stmt->bindParam(':user_id2', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    $totalIncome = $result['totalIncome'];
    $totalExpenses = $result['totalExpenses'];
    $remainingMoney = $totalIncome - $totalExpenses;

    $response = array(
        'totalIncome' => $totalIncome,
        'totalExpenses' => $totalExpenses,
        'remainingMoney' => $remainingMoney
    );

 
    echo json_encode($response);
?>
