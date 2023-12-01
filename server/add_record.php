<?php
    require 'database.php';

    $user_id = $_COOKIE['customer_id'];
    $amount = $_POST['amount'];
    $categoryOrSource = $_POST['type'] === 'income' ? ($_POST['source']) : ($_POST['category']);
    $date = $_POST['date'];
    $description = $_POST['description'];
    $type = $_POST['type']; 

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

        echo $stmt->rowCount() > 0 ? "0" : "1";
        
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
?>
