function translate1(word) {
  if (word.length == 0) {
    document.getElementById("translation0").innerHTML = "";
    return;
  } else {
    var sectionCount = $('#sections .section').length;
    for (let i=0; i < sectionCount; i++) {
      var formData = new FormData();
      var selectedLanguageVal = $("#language" + i + " :selected").val();
      if (!selectedLanguageVal) continue;
      formData.append('language', selectedLanguageVal);
      formData.append('action','translate');
      formData.append('word', word);
      $.ajax({
        type: "POST",
        url: 'conversion.php',
        data:formData,
        contentType: false,
        processData: false
      }).done(function(res) {
        document.getElementById("translation" + i).setAttribute("value", res);
      });
    }
  }
}

function languageSelected(number) {
  translate1(document.getElementById("word").value);
  document.getElementById("lan-key" + number).value = document.getElementById("language" + number).value;
}
