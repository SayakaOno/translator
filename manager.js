function translate1(word) {
  if (word.length == 0) {
    document.getElementById("translation0").innerHTML = "";
    return;
  } else {
    $.ajax({
      type: "POST",
      url: 'conversion.php',
      data:{
        action:'translate',
        word: word
      }
    }).done(function(res) {
      document.getElementById("translation0").setAttribute("value", res);
    });
  }
}
