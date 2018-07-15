function translate1() {
  var word = document.getElementById("word").value;
  if (word.length == 0) {
    alert("Please input word!");
    return;
  } else {
    var sectionCount = $('#sortable .section').length;
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
  var idNumber = $('#sortable .section').length;
  var sectionClone = $("#section0").clone().attr('id', "section" + idNumber);
  sectionClone.find('#lan-key0').val('');
  sectionClone.find('#translation0').val('');
  var garbageButton = $("<button></button>").html("<i class='fas fa-trash-alt'></i>").attr('id', "garbage" + idNumber).attr('class', "garbage").attr('onclick', 'deleteSection(' + idNumber + ')').appendTo(sectionClone);
  sectionClone.find('#utf0').val('');
  sectionClone.appendTo("#sortable");
  updateNames();
}

function updateNames() {
  $(function(){

      $('#sortable > div').each(function(i){
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
      $('.conversion input').each(function(i){
          $(this).attr('id', 'utf' + i);
      });
  })
}

function deleteSection(number) {
  ($('#section' + number)).remove();
  updateNames();
}

function convert() {
  var sectionCount = $('#sortable .section').length;
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
  var sectionCount = $('#sortable .section').length;
  let counter = 0;
  let response = "";
  for (let i=0; i < sectionCount; i++) {
    if ($('#key' + i).val() || $('#utf' + i).val()) {
      console.log(response);
      response = response + '"' + $('#lan-key' + i).val() + '":"' + $('#utf' + i).val() + '",';
    }
    counter++;
  }
  if (counter === 0) {
    alert("Please translate & convert first!");
  } else {
    response = "{" + response.slice(0, -1) + "}";
    document.getElementById("code").value = response;
  }
}

function operateGarbageButton() {
  $(function(){
      $('.section').each(function(i){
        if (i == 0) {
          if(($('.section')).find('button')) {
            $(this).find('button').remove();
          }
        } else {
          garbageNumber = i;
          var elementStg = '.section:eq(' + i + ')';
          var garbage = $("<button></button>").html("<i class='fas fa-trash-alt'></i>").attr('id', "garbage" + garbageNumber).attr('class', "garbage").attr('onclick', 'deleteSection(' + i + ')').appendTo($('.section:eq(' + i + ')'));
        }
      });
    })
}

async function refereshForm() {
  console.log("called");
  await sleep(1);
  updateNames();
  operateGarbageButton();
}

function sleep(millisec) {
  return new Promise(resolve => setTimeout(resolve, millisec));
}
