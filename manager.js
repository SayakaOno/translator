function translate1() {
  var word = document.getElementById("word").value;
  if (word.length == 0) {
    alert("Please input word!");
    return;
  } else {
    var sectionCount = $('#sections .section').length;
    let counter = 0;
    for (let i=0; i < sectionCount; i++) {
      var formData = new FormData();
      var originalLanguageVal = $("#original-language :selected").val();
      var selectedLanguageVal = $("#language" + i + " :selected").val();
      if (!selectedLanguageVal) continue;
      formData.append('originalLanguage', originalLanguageVal);
      formData.append('targetLanguage', selectedLanguageVal);
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
      counter++;
    }
    if (counter === 0) {
      alert("Please select language!");
    }
  }
}

function languageSelected(number) {
  document.getElementById("lan-key" + number).value = document.getElementById("language" + number).value;
  console.log(document.getElementById("language" + number).value);
}
