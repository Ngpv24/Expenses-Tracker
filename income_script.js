$(document).ready(function() {

    displayIncomeTable();

    $('#update_income_opt').on('click', function() {
        $('#addExpenses, #show_tables, #updateExpenses, #removeProduct, #AddTypeOfIncome, #box_calculations').hide();
        $('#updateIncome').show();
        showEditableIncomeTable();
    
    });

    /*Display Add Income Form */
    $('#income_add_tab').on('click', function() {
        $('#addExpenses, #updateExpenses, #updateIncome, #show_tables, #removeProduct, #box_calculations, #app_title').hide();
        $('#AddTypeOfIncome').show();
    });

    //Insert income when clicking
    $('#insert_income').on('click', function(event) {   
        event.preventDefault();
        addIncome();
    });

    //Display product table - home
    function displayIncomeTable(){ 
        $.ajax({
            url: 'display_table.php', 
            type: 'GET',
            data: {
                table:'income'
            },
            dataType: 'json',
            success: function (data) {
                if (data.length > 0) {
                    var table = incomeTableData(data, 'Display');
                    $('#income_table').html(table);
                    
                } else {
                    $('#income_table').html('No data found.');
                
                }
            },
            error: function (xhr, status, error) {
                $('#income_table').html('Error: ' + error);
            }
        });

    }//End display product


    //add income
    function addIncome() {

        var amount = $("#income_amount").val();
        var source = $("#income_source").val();
        var date = $('#date_of_income').val();
        var description = $("#income_desc").val();
        var type = 'income'
    
        $.ajax({
            url: 'add_record.php', 
            type: 'POST',
            data: {
                amount:amount,
                source:source,
                date:date,
                description:description,
                type: type
            },
            success: function (response) {
                if(response == "0") { 
                    alert("Inserted successfully.")
                    $("#income_amount").val('');
                    $("#income_source").val('');
                    $("#date_of_income").val('');
                    $("#income_desc").val('');
                    location.reload();
                }
                else { 
                    alert("There was an error.")
                }      
            }  
        });
     }
    

    //prepare update table
    function showEditableIncomeTable() {
        $.ajax({
            url: 'display_table.php',
            type: 'GET',
            data: {
                table:'income'
            },
            dataType: 'json',
            success: function (data) {
                if (data.length > 0) {
                    var table = incomeTableData(data, 'Update');
    
                    $('#updateIncome').html(table);
    
                    $('#update_income').on('submit', function(event){ 
                        event.preventDefault();
                        var formData =  $(this).serialize();
                        updateIncome(formData);
                    })
    
                } else {
                    $('#updateIncome').html('No data found.');
                }
            },
            error: function (xhr, status, error) {
                $('#updateIncome').html('Error: ' + error);
            }
        });
    }
    
    //update quantity
    function updateIncome(formData){ 
       
        $.ajax({
            url: 'update_income.php',
            type:'POST',
            data: formData,
            success: function(response) { 
                if(response == "0") {
                    alert("Record(s) updated sucessfully.");
                    location.reload();
                }
                else { 
                    alert("There was an error updating.");
                }
            }
        })   
    }

    function incomeTableData(data, type) {
   
        if(type == "Display") { 
           var table = '<table class="table-styled my-4">';
           table += '<tr><th>Amount</th><th>Source</th><th>DateOfIncome</th><th>Description</th></tr>'; 

           for (var i = 0; i < data.length; i++) {
               table += '<tr>';
              /*  table += '<td>' + data[i].IncomeID + '</td>'; */
               table += '<td>' + data[i].Amount + '</td>';
               table += '<td>' + data[i].Source + '</td>';
               table += '<td>' + data[i].DateOfIncome + '</td>';
               table += '<td>' + data[i].Description + '</td>';
               table += '</tr>';
           }
       
           table += '</table>';
          
        }
         else if (type == "Update") {
           var table = '<form id="update_income"><table class="table-styled my-4">';
           table += '<tr><th>Amount</th><th>Source</th><th>DateOfIncome</th><th>Description</th></tr>';
   
           for (var i = 0; i < data.length; i++) {
               table += '<tr>';
               table += '<input type="hidden" name="IncomeID' + i + '" value="' + data[i].IncomeID + '">';
               table += '<td><input type="number" name="Amount' + i + '" value="' + data[i].Amount + '"></td>';
               table += '<td><input type="text" name="Source' + i + '" value="' + data[i].Source + '"></td>';
               table += '<td><input type="date" name="DateOfIncome' + i + '" value="' + data[i].DateOfIncome + '"></td>';
               table += '<td><input type="text" name="Description' + i + '" value="' + data[i].Description + '"></td>';
    
              /*  table += '<td>' + data[i].UserID + '</td>'; */
          
               table += '</tr>';
   
           }
        
           table += '</table>';
           table += '<button type="submit" name="update_income" id="update_income"> Update Income </button>';
           table += '</form>';
   
       }
   
       else if (type == "Remove") {
           var table = '<form id="remove"><table class="table-styled my-4">';
           table += '<tr><th>IncomeID</th><th>UserID</th><th>Amount</th><th>Source</th><th>DateOfIncome</th><th>Description</th></tr>';   
           for (var i = 0; i < data.length; i++) {
               table += '<tr>';
               table += '<td>' + data[i].IncomeID + '</td>';
               table += '<td>' + data[i].UserID + '</td>';
               table += '<td>' + data[i].Amount + '</td>';
               table += '<td>' + data[i].Source + '</td>';
               table += '<td>' + data[i].DateOfIncome + '</td>';
               table += '<td>' + data[i].Description + '</td>';
               
               table += '</tr>';
   
           }
        
           table += '</table>';
           table += '<button type="submit" name="delete_product" id="delete_product"> Delete record </button>';
           table += '</form>';
   
       } 
   
       return table;  
   }


   

});

