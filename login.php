<?php
    require 'database.php';

    if(isset($_POST['username']) && isset($_POST['password'])) {

        $username = $_POST['username'];
        $password = $_POST['password'];

        $stmt = $pdo->prepare('SELECT * FROM users WHERE username = :username');
        $stmt->execute(['username' => $username]);
        $user = $stmt->fetch();

        if ($user) {
            if ($user['Password'] == $password) {
                $cookie_id   = "customer_id";
                $cookie_user = "cookie_user";
                setcookie($cookie_id,$user['UserID'], time() + 3600);
                setcookie($cookie_user,$user['Username'], time() + 3600);
                echo "success";
            } else {
                echo "Username exists, but password is incorrect.";
            }
        } else {
            echo "Username doesn't exist";
        }
    }

?>