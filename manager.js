function convert() {
      $.ajax({
           type: "POST",
           url: 'conversion.php',
           data:{action:'call_this'},
           success:function(data) {
             alert(data);
           }

      });
 }

 function showHint(str) {
     if (str.length == 0) {
         document.getElementById("txtHint").innerHTML = "";
         return;
     } else {
         var xmlhttp = new XMLHttpRequest();
         xmlhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                 document.getElementById("txtHint").innerHTML = this.responseText;
             }
         };
         xmlhttp.open("GET", "gethint.php?q=" + str, true);
         xmlhttp.send();
     }
 }

 function translate1(word) {
   if (word.length == 0) {
     document.getElementById("language0").innerHTML = "";
     return;
   } else {
     document.getElementById("language0").innerHTML = "TEST!";
     return;
   }
}
