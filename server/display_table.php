<?php
    require 'database.php';

    $user_id = $_COOKIE['cookie_id'];
    $table = $_GET['table'];

    if($table == 'expenses') {
        try {
       
            $expenses_table  = $pdo -> prepare("SELECT * FROM Expenses WHERE UserID = :user_id");
            $expenses_table -> execute(['user_id' => $user_id]);
            $result = $expenses_table -> fetchAll(PDO::FETCH_ASSOC);
    
            if(count($result) < 1) {
                echo -1;
            }
            else { 
                echo json_encode($result);
            }
        } catch(PDOException $e){
            throw new PDOException($e->getMessage(), (int)$e->getCode());
        }
    }
    else { 
        try {
       
            $income_table  = $pdo -> prepare("SELECT * FROM Income WHERE UserID = :user_id");
            $income_table -> execute(['user_id' => $user_id]);
            $result = $income_table -> fetchAll(PDO::FETCH_ASSOC);
    
            if(count($result) < 1) {
                echo -1;
            }
            else { 
                echo json_encode($result);
            }
        } catch(PDOException $e){
            throw new PDOException($e->getMessage(), (int)$e->getCode());
        }
    }
    


?>