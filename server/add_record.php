<?php
    require 'database.php';

    $user_id = $_COOKIE['cookie_id'];
    $amount = $_POST['amount'];
    $categoryOrSource = $_POST['type'] === 'income' ? ($_POST['source']) : ($_POST['category']);
    $date = $_POST['date'];
    $description = $_POST['description'];
    $type = $_POST['type']; 

    if($_POST['type'] === 'income') {
        $msg = 'Source';
    }
    else {
        $msg ='Category';
    }

    if ($amount === "") {
        echo "Please enter an amount.";
        exit;
    }
    else if(empty($categoryOrSource)) {
        echo "Please enter $msg";
        exit;
    }
    else if( empty($date)){
        echo "Please enter a date";
        exit;
    }


    if (!is_numeric($amount) || (float)$amount <= 0) {
        echo "Amount cannot be zero, negative, or a letter";
        exit;
    }
    else if (!preg_match('/^\d+(\.\d+)?$/', $amount)) {
        echo "Amount cannot be a letter";
        exit;
    }

    if(!preg_match('/^[A-Za-z0-9_]{0,20}$/',$description)) {
        echo "Only a max of 20 characters allowed.";
        exit;
    }

    try {
        if ($type === 'income') {
            $query = 'INSERT INTO income (UserID, Amount, Source, DateOfIncome, Description) VALUES (?, ?, ?, ?, ?)';
        } else {
            $query = 'INSERT INTO expenses (UserID, Amount, Category, DateOfExpense, Description) VALUES (?, ?, ?, ?, ?)';
        }

        $stmt = $pdo->prepare($query);

        $stmt->bindParam(1, $user_id, PDO::PARAM_INT);
        $stmt->bindParam(2, $amount, PDO::PARAM_STR);
        $stmt->bindParam(3, $categoryOrSource, PDO::PARAM_STR);
        $stmt->bindParam(4, $date, PDO::PARAM_STR);
        $stmt->bindParam(5, $description, PDO::PARAM_STR);

        $stmt->execute();

        echo $stmt->rowCount() > 0 ? "0" : "Error inserting record.";
        
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
?>
