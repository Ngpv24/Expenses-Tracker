<?php
    require 'database.php';

    $success = false;

    if (isset($_POST['type'])) {
        $type = $_POST['type'];
        $idField = $type === 'income' ? 'IncomeID' : 'ExpenseID';
        $tableName = $type === 'income' ? 'income' : 'expenses';

        foreach ($_POST[$idField] as $index => $id) {
            $amount = $_POST['Amount'][$index];
            $secondField = $type === 'income' ? $_POST['Source'][$index] : $_POST['Category'][$index];
            $dateField = $type === 'income' ? $_POST['DateOfIncome'][$index] : $_POST['DateOfExpense'][$index];
            $description = $_POST['Description'][$index];

            $secondFieldName = $type === 'income' ? 'Source' : 'Category';
            $dateFieldName = $type === 'income' ? 'DateOfIncome' : 'DateOfExpense';

            try {
                $stmt = $pdo->prepare("UPDATE $tableName SET Amount = :amount, $secondFieldName = :secondField, $dateFieldName = :dateField, Description = :description WHERE $idField = :id");

                $stmt->bindParam(':amount', $amount);
                $stmt->bindParam(':secondField', $secondField);
                $stmt->bindParam(':dateField', $dateField);
                $stmt->bindParam(':description', $description);
                $stmt->bindParam(':id', $id, PDO::PARAM_INT);

                $stmt->execute();

                if ($stmt->rowCount() > 0) {
                    $success = true;
                }
            } catch (PDOException $e) {
                $success = false;
                echo "Error updating record: " . $e->getMessage() . "\n";
            }
        }
    }

    if ($success) {
        echo "0";
    } else {
        echo "No new data entered";
    }
?>
