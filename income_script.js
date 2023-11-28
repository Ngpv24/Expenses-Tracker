$(document).ready(function() {

    displayTypeOfIncome();

    $('#update_income_opt').on('click', function() {
        $('#addTransaction, #show_tables, #updateProduct, #removeProduct, #AddTypeOfIncome, #box_calculations').hide();
        $('#updateIncome').show();
        showEditableIncomeTable();
    
      });

    //Display product table - home
    function displayTypeOfIncome(){ 
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

    function showEditableIncomeTable() {
        $.ajax({
            url: 'display_table.php',
            type: 'GET',
            data: {
                table:'expenses'
            },
            dataType: 'json',
            success: function (data) {
                if (data.length > 0) {
                    var table = incomeTableData(data, 'Update');
    
                    $('#updateProduct').html(table);
    
                    $('#update').on('submit', function(event){ 
                        event.preventDefault();
                        var formData =  $(this).serialize();
                        updateIncome(formData);
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
    function updateIncome(formData){ 
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

    function incomeTableData(data, type) {
   
        if(type == "Display") { 
           var table = '<table class="table-styled my-4">';
           table += '<tr><th>IncomeID</th><th>Amount</th><th>Source</th><th>DateOfIncome</th><th>Description</th></tr>'; 

           for (var i = 0; i < data.length; i++) {
               table += '<tr>';
               table += '<td>' + data[i].IncomeID + '</td>';
               table += '<td>' + data[i].Amount + '</td>';
               table += '<td>' + data[i].Source + '</td>';
               table += '<td>' + data[i].DateOfIncome + '</td>';
               table += '<td>' + data[i].Description + '</td>';
               table += '</tr>';
           }
       
           table += '</table>';
          
        }
         else if (type == "Update") {
           var table = '<form id="update"><table class="table-styled my-4">';
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
           table += '<button type="submit" name="update_product" id="update_product"> Update transaction </button>';
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

