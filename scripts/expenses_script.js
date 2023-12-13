$(document).ready(function() {

 displayExpensesTable();
 
 /*Display Product Table*/
 $('#home_tab').on('click', function() {
    $('#addExpenses , #updateExpensesContainer, #updateIncomeContainer, #removeExpensesContainer, #removeIncomeContainer, #AddTypeOfIncome').hide();
    $('#show_tables, #box_calculations, #app_title').show();
 });


 /*Display Add Transaction Form*/
 $('#expenses_add_tab').on('click', function() {
    $('#addExpenses').show();
    $('#updateExpensesContainer, #updateIncomeContainer, #show_tables, #AddTypeOfIncome, #removeExpensesContainer, #removeIncomeContainer, #box_calculations, #app_title').hide();  
  
});

 //display update product
 $('#update_expenses_opt').on('click', function() {
    $('#addExpenses, #show_tables, #updateIncomeContainer, #removeExpensesContainer, #removeIncomeContainer, #AddTypeOfIncome, #box_calculations, #app_title').hide();
    $('#updateExpensesContainer').show();
    showEditableExpenseTable();

  });

  //display remove product 
  $('#dlt_expenses_opt').on('click', function() {
    $('#addExpenses, #show_tables, #updateExpensesContainer, #updateIncomeContainer, #AddTypeOfIncome, #box_calculations, #app_title, #removeIncomeContainer').hide();
    $('#removeExpensesContainer').show();
    showCheckboxDelExpenses();
  });


  //from index.html submit button
  $('#insert_expenses').on('click', function(event) {   
    event.preventDefault();
    addExpenses();
  });

 //Display product table - home
 function displayExpensesTable(){ 
    $.ajax({
        url: 'server/display_table.php', 
        type: 'GET',
        data: {
            table:'expenses'
        },
        dataType: 'json',
        success: function (data) {
            if (data.length > 0) {
                var table = expensesTableData(data, 'Display');
                $('#expenses_table').html(table);
                
            } else {
                $('#expenses_table').html('No data found.');
              
            }
        },
        error: function (xhr, status, error) {
            $('#product_table').html('Error: ' + error);
        }
    });

 }//End display product

 //change this
 function addExpenses() {

    var amount = $("#expenses_amount").val();
    var category = $("#expenses_cat").val();
    var date = $('#date_of_expenses').val();
    var description = $("#expenses_desc").val();
    var type = 'expenses'

    $.ajax({
        url: 'server/add_record.php', 
        type: 'POST',
        data: {
            amount:amount,
            category:category,
            date:date,
            description:description,
            type: type
        },
        success: function (response) {
            if(response == "0") { 
                alert("Expenses inserted sucessfully")
                $("#expenses_amount").val('');
                $("#expenses_cat").val('');
                $("#date_of_expenses").val('');
                $("#description").val('');
                location.reload();
            }
            else { 
                alert(response)
            }      
        }  
    });
 }

 //Show table with editable fields
 function showEditableExpenseTable() {
    $.ajax({
        url: 'server/display_table.php',
        type: 'GET',
        data: {
            table:'expenses'
        },
        dataType: 'json',
        success: function (data) {
            if (data.length > 0) {
                var table = expensesTableData(data, 'Update');

                $('#updateExpenses').html(table);

                $('#update_expenses').on('submit', function(event){ 
                    event.preventDefault();
                    var formData =  $(this).serialize();
                    updateExpenses(formData);
                })

            } else {
                $('#updateExpenses').html('No data found.');
            }
        },
        error: function (xhr, status, error) {
            $('#updateExpenses').html('Error: ' + error);
        }
    });
}

//update expenses
function updateExpenses(formData){ 

    $.ajax({
        url: 'server/update_records.php',
        type:'POST',
        data: formData,
        success: function(response) { 
            if(response == "0") {
                alert("Expenses updated successfully.");
                location.reload();
            }
            else { 
                alert(response);
            }
        }
    })   
}

//Show table with checkbox to delete records
function showCheckboxDelExpenses(){ 
    $.ajax({
        url: 'server/display_table.php',
        type: 'GET',
        data: {
            table:'expenses'
        },
        dataType: 'json',
        success: function (data) {
            if (data.length > 0) {
                var table = expensesTableData(data, 'Remove');

                $('#removeExpenses').html(table);

                $('#remove_expenses').on('submit', function(event){ 
                    event.preventDefault();
                    var formData =  $(this).serialize();
                  
                    removeExpenses(formData);
                })

            } else {
                $('#removeExpenses').html('No data found.');
            }
        },
        error: function (xhr, status, error) {
            $('#removeExpenses').html('Error: ' + error);
        }
    })   
}

//Remove expenses 
function removeExpenses(formData) {

    $.ajax({
        url: 'server/remove_record.php',
        type:'POST',
        data: formData,
        success: function(response) { 
            if(response == "0") {
                alert("Product(s) removed successfully");
                location.reload();
            }
            else { 
                alert(response);
            }
        }
    })  
}

//Display table based of type = display, update, delete
function expensesTableData(data, type) {
   
     if(type == "Display") { 
        var table = '<table class="table-styled my-4">';
        table += '<tr><th>Amount</th><th>Category</th><th>DateOfExpense</th><th>Description</th></tr>';

        for (var i = 0; i < data.length; i++) {
            table += '<tr>';
           /*  table += '<td>' + data[i].ExpenseID + '</td>'; */
            table += '<td style="color: red;">$' + data[i].Amount + '</td>';
            table += '<td>' + data[i].Category + '</td>';
            table += '<td>' + data[i].DateOfExpense + '</td>';
            table += '<td>' + data[i].Description + '</td>';
            table += '</tr>';
        }
    
        table += '</table>';
       
     }
     else if (type == "Update") {
        var table = '<form id="update_expenses"><table class="table-styled my-4">';
        table += '<input type="hidden" name="type" value="expenses">';
        table += '<tr><th>Amount</th><th>Category</th><th>DateOfExpense</th><th>Description</th></tr>';
    
        for (var i = 0; i < data.length; i++) {
            table += '<tr>';
            table += '<input type="hidden" name="ExpenseID[]" value="' + data[i].ExpenseID + '">';
            table += '<td><input type="number" name="Amount[]" value="' + data[i].Amount + '"></td>';
            table += '<td><input type="text" name="Category[]" value="' + data[i].Category + '"></td>';
            table += '<td><input type="date" name="DateOfExpense[]" value="' + data[i].DateOfExpense + '"></td>';
            table += '<td><input type="text" name="Description[]" value="' + data[i].Description + '"></td>';
            table += '</tr>';
        }
    
        table += '</table>';
        table += '<button type="submit" name="update_expenses" id="update_expenses"> Update transaction </button>';
        table += '</form>';
    }

    //<th>UserID</th>
    else if (type == "Remove") {
        var table = '<form id="remove_expenses"><table class="table-styled my-4">';
        table += '<tr><th>Amount</th><th>Category</th><th>DateOfExpense</th><th>Description</th><th>Delete</th></tr>';

        for (var i = 0; i < data.length; i++) {
            table += '<tr>';
          /*   table += '<td>' + data[i].ExpenseID + '</td>'; */
            table += '<td>' + data[i].Amount + '</td>';
            table += '<td>' + data[i].Category + '</td>';
            table += '<td>' + data[i].DateOfExpense + '</td>';
            table += '<td>' + data[i].Description + '</td>';
            table += '<td> <input type="checkbox" name="' + data[i].ExpenseID + '"value="Y"></td>'
            
            table += '</tr>';

        }
        
        table += '<input type="hidden" name="type" value="expenses">';
        table += '</table>';
        table += '<button type="submit" name="delete_expenses" id="delete_expenses"> Delete record </button>';
        table += '</form>';

    } 

    return table;  
}


});