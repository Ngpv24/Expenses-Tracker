$(document).ready(function() {
 
    checkCookieAndRedirect();

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
   
   });