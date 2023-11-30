$(document).ready(function() {

 total_income = 0;
 total_expenses = 0;
 remaining_balance = 0;

 /*Initialize hide all the forms*/   
 $('#addExpenses, #updateExpenses, #AddTypeOfIncome').hide();
 
 displayExpensesTable();
 checkCookieAndRedirect();

 /*Display Product Table*/
 $('#home_tab').on('click', function() {
    $('#addExpenses , #updateExpenses, #updateIncome, #removeExpenses, #removeIncome, #AddTypeOfIncome').hide();
    $('#show_tables, #box_calculations, #app_title').show();
 });


 /*Display Add Transaction Form*/
 $('#expenses_add_tab').on('click', function() {
    $('#addExpenses').show();
    $('#updateExpenses, #updateIncome, #show_tables, #AddTypeOfIncome, #removeExpenses, #box_calculations, #app_title').hide();  
  
});

 //display update product
 $('#update_expenses_opt').on('click', function() {
    $('#addExpenses, #show_tables, #updateIncome, #removeExpenses, #AddTypeOfIncome, #box_calculations, #app_title').hide();
    $('#updateExpenses').show();
    showEditableExpenseTable();

  });

  //display remove product 
  $('#dlt_expenses_opt').on('click', function() {
    $('#addExpenses, #show_tables, #updateExpenses, #updateIncome, #AddTypeOfIncome, #box_calculations, #app_title, #removeIncome').hide();
    $('#removeExpenses').show();
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
        url: 'display_table.php', 
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
        url: 'add_record.php', 
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
                alert("Inserted successfully.")
                $("#expenses_amount").val('');
                $("#expenses_cat").val('');
                $("#date_of_expenses").val('');
                $("#description").val('');
                location.reload();
            }
            else { 
                alert("There was an error.")
            }      
        }  
    });
 }

 //Show table with editable fields
 function showEditableExpenseTable() {
    $.ajax({
        url: 'display_table.php',
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
        url: 'update_expenses.php',
        type:'POST',
        data: formData,
        success: function(response) { 
            if(response == "0") {
                alert("Expenses updated successfully.");
                location.reload();
            }
            else { 
                alert("There was an error updating.");
            }
        }
    })   
}

//Show table with checkbox to delete records
function showCheckboxDelExpenses(){ 
    $.ajax({
        url: 'display_table.php',
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
        url: 'remove_record.php',
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
            table += '<td>' + data[i].Amount + '</td>';
            table += '<td>' + data[i].Category + '</td>';
            table += '<td>' + data[i].DateOfExpense + '</td>';
            table += '<td>' + data[i].Description + '</td>';
            table += '</tr>';
        }
    
        table += '</table>';
       
     }
     else if (type == "Update") {
        var table = '<form id="update_expenses"><table class="table-styled my-4">';
        table += '<tr><th>Amount</th><th>Category</th><th>DateOfExpense</th><th>Description</th></tr>';
    
        for (var i = 0; i < data.length; i++) {
            table += '<tr>';
            table += '<input type="hidden" name="ExpenseID' + i + '" value="' + data[i].ExpenseID + '">';
            table += '<td><input type="number" name="Amount' + i + '" value="' + data[i].Amount + '"></td>';
            table += '<td><input type="text" name="Category' + i + '" value="' + data[i].Category + '"></td>';
            table += '<td><input type="date" name="DateOfExpense' + i + '" value="' + data[i].DateOfExpense + '"></td>';
            table += '<td><input type="text" name="Description' + i + '" value="' + data[i].Description + '"></td>';
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

/*Redirect to login if cookies end */
function checkCookieAndRedirect() {
    var cookie = getCookie("customer_id"); 
    if (cookie === null || cookie === "") {
        window.location.href = 'login.html'; 
    }
}

/*Function to get cookie - source: w3schools*/
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}//End function


});