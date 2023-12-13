<?php

require 'database.php';

    // Basic validation
    if (empty($_POST['username']) || empty($_POST['password']) ||
         empty($_POST['gender'] || empty($_POST['first_name']) || empty($_POST['last_name']))) {
        echo "Please fill in all fields.";
        exit;
    }

    $username = $_POST['username'];
    $fname = $_POST['first_name'];
    $lname = $_POST['last_name'];
    $password = $_POST['password'];
    $gender = $_POST['gender'];

    #match any letter for username
    if(!preg_match('/^[A-Za-z0-9]{4,}$/', $username)) {
        echo "username should be at least 4 characters";
        exit;
    }
    #match one capital letter and a total of 5 characters including any character (e.g. @)
    else if (!preg_match('/^[A-Z][a-z0-9]{4,}$/',$password)){
        echo "password should be longer than 5 characters and start with a Capital letter";
        exit;
    }
;

    $checkStmt = $pdo->prepare("SELECT * FROM Users WHERE username = ?");
    $checkStmt -> bindParam(1, $username, PDO::PARAM_STR);
    $checkStmt -> execute();

    if($checkStmt->rowCount() > 0) {
        echo "A user with that username already exists.";
        exit;
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO users (username, Password, FirstName, LastName, Gender) VALUES (?, ?, ?, ?, ?)");

        $stmt->bindParam(1, $username, PDO::PARAM_STR);
        $stmt->bindParam(2, $password, PDO::PARAM_STR);
        $stmt->bindParam(3, $fname, PDO::PARAM_STR);
        $stmt->bindParam(4, $lname, PDO::PARAM_STR);
        $stmt->bindParam(5, $gender, PDO::PARAM_STR);
        $stmt -> execute();

        if ($stmt->rowCount()) {
            echo "0";
        } else {
            echo "Failed to register. Please try again.";
        }
    } catch (PDOException $e) {
        echo $e->getMessage() . "\n";
    }

?>
