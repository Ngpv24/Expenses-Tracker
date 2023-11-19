
$(document).ready(function() {

    $('#loginForm').on('submit', function(event) {
        event.preventDefault();
        login();
    });

    function login(){
        var username = $('#user').val();
        var password = $('#pass').val();
    
        if (username === '' || password === '') {
            alert('Please enter both username and password');
            return;
        }
        $.ajax({
            type: 'POST',
            url: 'login.php', 
            data: { 
                username: username, 
                password: password 
            },
            success: function(response) {
                if (response === 'success') {
                    window.location.href = 'dashboard.html'; 
                } else {
                    alert(response);
                }
            }
        });
    }
});
