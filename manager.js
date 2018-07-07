function translate1(word) {
  if (word.length == 0) {
    document.getElementById("translation0").innerHTML = "";
    return;
  } else {
    var formData = new FormData();
    formData.append('language0', $("#language0 :selected").val());
    formData.append('action','translate');
    formData.append('word',word);
    $.ajax({
      type: "POST",
      url: 'conversion.php',
      data:formData,
      contentType: false,
      processData: false
    }).done(function(res) {
      document.getElementById("translation0").setAttribute("value", res);
    });
  }
}
