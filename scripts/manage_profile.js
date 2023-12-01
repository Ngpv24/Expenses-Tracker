$(document).ready(function() {
 
 displayUserInfo();

 $('#goToDashboard').on('click', function() {
    window.location.href = 'dashboard.html'; 
 })

 /* $('#deleteAccount').on('click', function(e) {
    deleteAccount();
 })
 */
 function displayUserInfo() {
    $.ajax({
        url: 'server/user_information.php', 
        type: 'GET', 
        dataType: 'json', 
        success: function(data) {
            console.log(data); 
            $('#username').text(data.Username); 
            $('#first_name').text(data.FirstName);
            $('#last_name').text(data.LastName); 
            $('#gender').text(data.Gender);     
            $('#income').text(data.totalIncome);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('AJAX error: ' + textStatus + ' : ' + errorThrown);
        }
    });
 }

 function deleteAccount() {
 }

   
});