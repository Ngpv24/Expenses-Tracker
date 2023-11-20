$(document).ready(function() {

 /*Initialize hide all the forms*/   
 $('#addTransaction, #updateProduct, #AddTypeOfIncome').hide();
 
 displayExpensesTable();
 checkCookieAndRedirect();

 /*Display Product Table*/
 $('#home_tab').on('click', function() {
    $('#addTransaction , #updateProduct, #removeProduct, #AddTypeOfIncome').hide();
    $('#show_tables, #box_calculations').show();
 });


 /*Display Add Transaction Form*/
 $('#product_tab').on('click', function() {
    $('#addTransaction').show();
    $('#updateProduct, #show_tables, #AddTypeOfIncome, #removeProduct, #box_calculations').hide();  
  
});

/*Display Add Income Form */
$('#income_add_tab').on('click', function() {
    $('#addTransaction, #updateProduct, #show_tables, #removeProduct, #box_calculations').hide();
    $('#AddTypeOfIncome').show();
});

 //display update product
 $('#update_expenses_opt').on('click', function() {
    $('#addTransaction, #show_tables, #removeProduct, #AddTypeOfIncome, #box_calculations').hide();
    $('#updateProduct').show();
    showEditableQuantity();

  });

  //display remove product 
  $('#dlt_expenses_opt').on('click', function() {
    $('#addTransaction, #show_tables, #updateProduct, #AddTypeOfIncome, #box_calculations').hide();
    $('#removeProduct').show();
    showCheckboxDelProduct();
  });


  //from index.html submit button
  $('#insert_expenses').on('click', function(event) {   
    event.preventDefault();
    addProduct();
  });

 //Display product table - home
 function displayExpensesTable(){ 
    $.ajax({
        url: 'display_table.php', 
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.length > 0) {
                var table = expensesTableData(data, 'Display');
                $('#expenses_table').html(table);
                $('#income_table').html(table);
                
            } else {
                $('#expenses_table').html('No data found.');
                $('#income_table').html('No data found.');
            }
        },
        error: function (xhr, status, error) {
            $('#product_table').html('Error: ' + error);
        }
    });

 }//End display product

  

 function addProduct() {

    var prod_name = $("#prod_name").val();
    var description = $("#description").val();
    var category = $("#category").val();
    var vendor_id = $("#vendor_id").val();
    var stock_loc = $("#stock_loc").val();
    var quantity = $("#quantity").val();

    $.ajax({
        url: 'add_product.php', 
        type: 'POST',
        data: {
            prod_name:prod_name,
            description:description,
            category:category,
            vendor_id:vendor_id,
            stock_loc:stock_loc,
            quantity:quantity
        },
        success: function (response) {
            if(response == "0") { 
                alert("Inserted successfully.")
                $("#prod_name").val('');
                $("#description").val('');
                $("#vendor_id").val('');
                $("#stock_loc").val('');
                $("#quantity").val('');
                location.reload();
            }
            else { 
                alert("There was an error.")
            }      
        }  
    });
 }

 //Show table with quantity editable
 function showEditableQuantity() {
    $.ajax({
        url: 'display_table.php',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.length > 0) {
                var table = expensesTableData(data, 'Update');

                $('#updateProduct').html(table);

                $('#update').on('submit', function(event){ 
                    event.preventDefault();
                    var formData =  $(this).serialize();
                    updateQuantity(formData);
                })

            } else {
                $('#updateProduct').html('No data found.');
            }
        },
        error: function (xhr, status, error) {
            $('#updateProduct').html('Error: ' + error);
        }
    });
}

//update quantity
function updateQuantity(formData){ 
    $.ajax({
        url: 'update_quantity.php',
        type:'POST',
        data: formData,
        success: function(response) { 
            if(response == "0") {
                alert("Quantity updated successfully.");
                location.reload();
            }
            else { 
                alert("There was an error updating.");
            }

        }
    })   
}

function showCheckboxDelProduct(){ 
    $.ajax({
        url: 'display_table.php',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.length > 0) {
                var table = expensesTableData(data, 'Remove');

                $('#removeProduct').html(table);

                $('#remove').on('submit', function(event){ 
                    event.preventDefault();
                    var formData =  $(this).serialize();
                    removeProduct(formData);
                })

            } else {
                $('#removeProduct').html('No data found.');
            }
        },
        error: function (xhr, status, error) {
            $('#removeProduct').html('Error: ' + error);
        }
    })   
}

function removeProduct(formData) {
    $.ajax({
        url: 'remove_product.php',
        type:'POST',
        data: formData,
        success: function(response) { 
            if(response == "0") {
                alert("Product removed successfully.");
                location.reload();
            }
            else { 
                alert(response);
            }
        }
    })  
}

function expensesTableData(data, type) {
   
     if(type == "Display") { 
        var table = '<table class="table-styled my-4">';
        table += '<tr><th>ExpenseID</th><th>UserID</th><th>Amount</th><th>Category</th><th>DateOfExpense</th><th>Description</th></tr>';

        for (var i = 0; i < data.length; i++) {
            table += '<tr>';
            table += '<td>' + data[i].ExpenseID + '</td>';
            table += '<td>' + data[i].UserID + '</td>';
            table += '<td>' + data[i].Amount + '</td>';
            table += '<td>' + data[i].Category + '</td>';
            table += '<td>' + data[i].DateOfExpense + '</td>';
            table += '<td>' + data[i].Description + '</td>';
            table += '</tr>';
        }
    
        table += '</table>';
       
     }
      else if (type == "Update") {
        var table = '<form id="update"><table class="table-styled my-4">';
        table += '<tr><th>ExpenseID</th><th>UserID</th><th>Amount</th><th>Category</th><th>DateOfExpense</th><th>Description</th></tr>';

        for (var i = 0; i < data.length; i++) {
            table += '<tr>';
            table += '<td>' + data[i].ExpenseID + '</td>';
            table += '<td>' + data[i].UserID + '</td>';
            table += '<td>' + data[i].Amount + '</td>';
            table += '<td>' + data[i].Category + '</td>';
            table += '<td>' + data[i].DateOfExpense + '</td>';
            table += '<td>' + data[i].Description + '</td>';
            // Add an input field for quantity editing
            /* table += '<td><input type="number" name="' + data[i].Product_ID + '" value=' + data[i].Quantity + '></td>'; */
            table += '</tr>';

        }
     
        table += '</table>';
        table += '<button type="submit" name="update_product" id="update_product"> Update transaction </button>';
        table += '</form>';

    }

    else if (type == "Remove") {
        var table = '<form id="remove"><table class="table-styled my-4">';
        table += '<tr><th>ExpenseID</th><th>UserID</th><th>Amount</th><th>Category</th><th>DateOfExpense</th><th>Description</th><th>Delete</th></tr>';

        for (var i = 0; i < data.length; i++) {
            table += '<tr>';
            table += '<td>' + data[i].ExpenseID + '</td>';
            table += '<td>' + data[i].UserID + '</td>';
            table += '<td>' + data[i].Amount + '</td>';
            table += '<td>' + data[i].Category + '</td>';
            table += '<td>' + data[i].DateOfExpense + '</td>';
            table += '<td>' + data[i].Description + '</td>';
            // Add an input field for quantity editing
            table += '<td> <input type="checkbox" name="' + data[i].Product_ID + '"value="Y"></td>'
            
            table += '</tr>';

        }
     
        table += '</table>';
        table += '<button type="submit" name="delete_product" id="delete_product"> Delete record </button>';
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