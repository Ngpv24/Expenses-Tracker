<?php
    require 'database.php';

    $type = $_POST['type']; // 'expenses' or 'income'
    $success = false;

    foreach($_POST as $key => $value) {
        if($value === 'Y') { 
            $recordID = $key;

            try {
                if ($type === 'income') {
                    $delete_stmt = $pdo->prepare("DELETE FROM income WHERE IncomeID = ?");
                } else {
                    $delete_stmt = $pdo->prepare("DELETE FROM expenses WHERE ExpenseID = ?");
                }
                
                $delete_stmt->bindParam(1, $recordID, PDO::PARAM_INT);
                $delete_stmt->execute();

                if($delete_stmt->rowCount() > 0) { 
                    $success = true;
                }

            } catch(PDOException $e) {
                throw new PDOException($e->getMessage(), (int)$e->getCode());
            }
        }      
    }

    echo $success ? "0" : "Failed to delete record.";
?>
