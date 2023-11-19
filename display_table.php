<?php
    require 'database.php';

    $user_id = $_COOKIE['customer_id'];

    try {
       
        $product_table  = $pdo -> prepare("SELECT * FROM Expenses WHERE UserID = :user_id");
        $product_table -> execute(['user_id' => $user_id]);
        $result = $product_table -> fetchAll(PDO::FETCH_ASSOC);

        if(count($result) < 1) {
            echo -1;
        }
        else { 
            echo json_encode($result);
        }
    } catch(PDOException $e){
        throw new PDOException($e->getMessage(), (int)$e->getCode());
    }



?>