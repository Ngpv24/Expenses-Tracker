<?php
    require 'database.php';

    $success = false;

    foreach ($_POST as $key => $value) {
        
        if (!preg_match('/^(Amount|Category|DateOfExpense|Description)(\d+)$/', $key, $matches)) {
            continue;
        }

        $fieldName = $matches[1];
        $rowIndex = $matches[2];

        try {
        
            $stmt = $pdo->prepare("UPDATE expenses SET $fieldName = :value WHERE ExpenseID = :expenseId");

            $stmt->bindParam(':value', $value);
            $stmt->bindParam(':expenseId', $_POST['ExpenseID'.$rowIndex], PDO::PARAM_INT);
            $stmt->execute();
            
            if ($stmt->rowCount() > 0) {    
                $success = true;
            }


        } catch (PDOException $e) {
            $success = false;
            echo "Error updating record: " . $e->getMessage() . " in field: " . $fieldName . "\n";
        }
    }

    if ($success) {
        echo "0";
    } else {
        echo "Error updating records.";
    }
?>
