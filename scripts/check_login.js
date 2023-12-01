$(document).ready(function() {
 
    checkCookieAndRedirect();

    $('#sign_out').on('click', function() {
      cleanCookies();
      window.location.href = 'login.html';
    });

    /*Redirect to login if cookies end */
   function checkCookieAndRedirect() {
       var cookie = getCookie("cookie_id"); 
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

   function cleanCookies(){
    var pastDate = new Date(0).toUTCString();
    document.cookie = "cookie_id=''; expires=" + pastDate + "; path=/";
    document.cookie = "cookie_user=''; expires=" + pastDate + "; path=/"; 
    alert('Sign out sucessfully');
   }

  });