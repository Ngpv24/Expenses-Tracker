$(document).ready(function() {

    displayFinancialSummary();
    
    // Function to display financial summary
    function displayFinancialSummary() {
        $.ajax({
            url: 'server/budget_summary.php', // The PHP file that will return financial data
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                $('#total_income').html('$' + parseFloat(data.totalIncome).toFixed(2));
                $('#total_expenses').html('$' + parseFloat(data.totalExpenses).toFixed(2));
                $('#remaining_money').html('$' + parseFloat(data.remainingMoney).toFixed(2));
            },
            error: function(xhr, status, error) {
                console.log('Error: ' + error);
            }
        });
    }

    // Call the function to display financial summary
    
});
