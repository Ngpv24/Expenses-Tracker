$(document).ready(function() {

    //Display product table - home
    function displayTypeOfIncome(){ 
        $.ajax({
            url: 'display_table.php', 
            type: 'GET',
            data: {
                table: 'income'
            },
            dataType: 'json',
            success: function (data) {
                if (data.length > 0) {
                    var table = expensesTableData(data, 'Display');
                    $('#product_table').html(table);
                    
                } else {
                    $('#product_table').html('No data found.');
                }
            },
            error: function (xhr, status, error) {
                $('#product_table').html('Error: ' + error);
            }
        });
    }//End display product

});

