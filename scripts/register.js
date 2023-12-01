$(document).ready(function() {

    $('#registerForm').on('submit', function(e) {
        e.preventDefault(); 

        var username = $('#user').val();
        var password = $('#pass').val();
        var fname = $('#first_name').val();
        var lname = $('#last_name').val();
        var gender = $('#gender').val();


        $.ajax({
            url: 'server/register_user.php', 
            type: 'POST',
            data: {
                username: username,
                password: password,
                first_name: fname,
                last_name: lname,
                gender: gender,
            },
            success: function(response) {
                if(response == '0'){ 
                    alert("Registration successful.")
                    window.location.href = 'login.html'; 
                }
                else { 
                    alert(response);
                }
               
            },
            error: function(xhr, status, error) {
                // Handle errors here
                console.error(error);
            }
        });
    });
});
