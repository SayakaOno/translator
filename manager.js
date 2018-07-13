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
        data: formData,
        contentType: false,
        processData: false
      }).done(function(res) {
        document.getElementById("translation" + i).value = res;
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
}

function addSection() {
  var idNumber = $('#sections .section').length;
  var sectionClone = $("#section0").clone().attr('id', "section" + idNumber);
  sectionClone.find('#lan-key0').val('');
  sectionClone.find('#translation0').val('');
  var garbageButton = $("<button></button>").html("<i class='fas fa-trash-alt'></i>").attr('id', "garbage" + idNumber).attr('class', "garbage").attr('onclick', 'deleteSection(' + idNumber + ')').appendTo(sectionClone);
  if (1) {
    sectionClone.find('#utf0').val('');
  }
  sectionClone.appendTo("#sections");
  updateNames();
}

function updateNames() {
  $(function(){
      $('#sections > div').each(function(i){
          $(this).attr('id', 'section' + i);
      });
      $('.language-key > select').each(function(i){
          $(this).attr('id', 'language' + i).attr('onchange', 'languageSelected(' + i + ')');
      });
      $('.language-key input').each(function(i){
          $(this).attr('id', 'lan-key' + i);
      });
      $('.translation input').each(function(i){
          $(this).attr('id', 'translation' + i);
      });
      $('.section button').each(function(i){
        if (i != 0) {
          $(this).attr('id', 'garbage' + i).attr('onclick', 'deleteSection(' + i + ')');
        }
      });
      if (1) {
        $('.conversion input').each(function(i){
          if (i != 0) {
            $(this).attr('id', 'utf' + i);
          }
        });
      }
    })
}

function deleteSection(number) {
  ($('#section' + number)).remove();
  updateNames();
}

function convert() {
  var sectionCount = $('#sections .section').length;
  let counter = 0;
  for (let i=0; i < sectionCount; i++) {
    var formData = new FormData();
    var translatedWord = $("#translation" + i).val();
    if (!translatedWord) continue;
    formData.append('string', translatedWord);
    formData.append('action','convert');
    $.ajax({
      type: "POST",
      url: 'conversion.php',
      data: formData,
      contentType: false,
      processData: false
    }).done(function(res) {
      document.getElementById("utf" + i).value = res;
    });
    counter++;
  }
  if (counter === 0) {
    alert("Please translate first!");
  }
}

function format() {
  var sectionCount = $('#sections .section').length;
  let counter = 0;
  let response = "";
  for (let i=0; i < sectionCount; i++) {
    if ($('#key' + i).val() || $('#utf' + i).val()) {
      console.log(response);
      response = response + "'" + $('#lan-key' + i).val() + "': '" + $('#utf' + i).val() + "', ";
    }
    counter++;
  }
  if (counter === 0) {
    alert("Please translate & convert first!");
  } else {
    response = "{" + response.slice(0, -2) + "}";
    document.getElementById("code").value = response;
  }
}
