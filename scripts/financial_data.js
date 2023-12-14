google.charts.load('current', {'packages':['corechart']});

$(document).ready(function() {

    displayFinancialSummary();

    function drawChart(data) {
        var dataTable = new google.visualization.DataTable();
        var totalIncome = parseFloat(data.totalIncome)
        var totalExpense = parseFloat(data.totalExpenses)

        dataTable.addColumn('string', 'Category');
        dataTable.addColumn('number', 'Amount');
        dataTable.addRows([
            ['Income', totalIncome],
            ['Expenses', totalExpense],
        ]);

        var options = {
            title: 'Financial Overview',
            width: 400,
            height: 300,
            legend: {
                position: 'right',
                textStyle: { 
                    fontSize: 14
                }
            },
            chartArea: { 
                width: '100%', 
                height: '60%' 
            },
            pieSliceTextStyle: {
                fontSize: 14
            },
            backgroundColor: {
                stroke: 'rgb(109, 107, 107)',
                fill: 'transparent'
            },
            colors: ['green', 'red']
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(dataTable, options);

    }
    
    function displayFinancialSummary() {
        $.ajax({
            url: 'server/budget_summary.php', 
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                $('#total_income').html('$' + parseFloat(data.totalIncome).toFixed(2));
                $('#total_expenses').html('-$' + parseFloat(data.totalExpenses).toFixed(2));
                $('#remaining_money').html('$' + parseFloat(data.remainingMoney).toFixed(2));
            
                google.charts.setOnLoadCallback(function() {drawChart(data);})
            },
            error: function(error) {
                console.log('Error: ' + error);
            }
        });
    }

});
