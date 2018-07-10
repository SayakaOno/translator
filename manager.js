function translate1(word) {
  if (word.length == 0) {
    document.getElementById("translation0").innerHTML = "";
    return;
  } else {
    var sectionCount = $('#sections .section').length;
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
    }
  }
}

function languageSelected(number) {
  translate1(document.getElementById("word").value);
  document.getElementById("lan-key" + number).value = document.getElementById("language" + number).value;
}

function addSection() {
  var idNumber = $('#sections .section').length + 1;
  var sectionClone = $("#section0").clone().attr('id', "section" + idNumber);
//   var btn = document.createElement("BUTTON");        // Create a <button> element
//   var t = document.createTextNode("<i class='fas fa-trash-alt'></i>");       // Create a text node
// btn.appendChild(t);
// console.log(sectionClone.append(btn));
// console.log(sectionClone);
// sectionClone.append(btn);
  var garbageButton = $("<button></button>").html("<i class='fas fa-trash-alt'></i>").attr('id', "garbage" + idNumber).attr('class', "garbage").appendTo(sectionClone);
  sectionClone.appendTo("#sections");
  // '<button id="garbage"' . $i . ' class="garbage"><i class="fas fa-trash-alt"></i>'
}
