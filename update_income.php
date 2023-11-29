<?php
    require 'database.php';

    $success = false;

    foreach ($_POST as $key => $value) {
        
        if (!preg_match('/^(Amount|Source|DateOfIncome|Description)(\d+)$/', $key, $matches)) {
            continue;
        }

        $fieldName = $matches[1];
        $rowIndex = $matches[2];

        try {
            $stmt = $pdo->prepare("UPDATE income SET $fieldName = :value WHERE IncomeID = :incomeId");

            $stmt->bindParam(':value', $value);
            $stmt->bindParam(':incomeId', $_POST['IncomeID'.$rowIndex], PDO::PARAM_INT); #income id is being passed as a hidden field
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
