function translate1() {
  var word = document.getElementById("word").value;
  if (word.length == 0) {
    alert("Please input word!");
    return;
  } else {
    var sectionCount = $('#sortable .section').length;
    let counter = 0;
    let check = 0;
    let start = false;
    for (let i=0; i < sectionCount; i++) {
      var formData = new FormData();
      var originalLanguageVal = $("#original-language :selected").val();
      var selectedLanguageVal = $("#language" + i + " :selected").val();
      if (!selectedLanguageVal) continue;
      if (!start) {
        $(document.body).attr('class', 'translating');
        start = true;
      }
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
        if(!res) {
          alert("Please click Translate button one more time!");
        } else {
          document.getElementById("translation" + i).value = res;
          check++;
        }
      }).done(function(res) {
        if (counter == check) {
          $(document.body).removeClass('translating')
        }
      });
      counter++;
    }
    if (counter === 0) {
      alert("Please select language!");
    }
  }
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

function translationToFormat() {
  $.when(
    convert()
  ).done(function() {
    var i = $('#sortable .section').length - 1;
    var foundIndex = 0;
    for (i; 0 <= i; i--) {
      if ($('#translation' + i).val()) {
        foundIndex = i;
        //TODO
        //check if the utf inputted
        format();
        break;
      }
    }
  });
}

function languageSelected(number) {
  document.getElementById("lan-key" + number).value = document.getElementById("language" + number).value;
}

function addSection() {
  var idNumber = $('#sortable .section').length;
  var sectionClone = $("#section0").clone().attr('id', "section" + idNumber);
  sectionClone.find('#lan-key0').val('');
  sectionClone.find('#translation0').val('');
  sectionClone.find('#order0').attr('id', "order" + idNumber).val(idNumber + 1);
  sectionClone.find('.translation-copy').attr('onclick', "copy('translation" + idNumber + "')");
  sectionClone.find('.utf-copy').attr('onclick', "copy('utf" + idNumber + "')");
  $("<button></button>").html("<i class='fas fa-times-circle'></i>").attr('id', "garbage" + idNumber).attr('class', "garbage").attr('onclick', 'deleteSection(' + idNumber + ')').appendTo(sectionClone);
  sectionClone.find('#utf0').val('');
  sectionClone.appendTo("#sortable");
  updateNames();
}

function updateNames() {
  $(function(){

      $('#sortable > div').each(function(i){
          $(this).attr('id', 'section' + i);
      });
      $('.language select').each(function(i){
          $(this).attr('id', 'language' + i).attr('onchange', 'languageSelected(' + i + ')');
      });
      $('.key input').each(function(i){
          $(this).attr('id', 'lan-key' + i);
      });
      $('.translation input').each(function(i){
          $(this).attr('id', 'translation' + i);
      });
      $('.conversion input').each(function(i){
          $(this).attr('id', 'utf' + i);
      });
      $('.order input').each(function(i){
          $(this).attr('id', 'order' + i).attr('onkeypress', 'changeOrder(' + i + ', event)').val(i + 1);
      });
      $('.translation-copy').each(function(i){
          $(this).attr('onclick', "copy('translation" + i + "')");
      });
      $('.utf-copy').each(function(i){
          $(this).attr('onclick', "copy('utf" + i + "')");
      });
      $('.garbage').each(function(i){
          var garbageId = i + 1;
          $(this).attr('id', "garbage" + garbageId).attr('onclick', 'deleteSection(' + garbageId + ')');
      });
  })
}

function deleteSection(number) {
  ($('#section' + number)).remove();
  refereshForm();
}


function format() {
  var sectionCount = $('#sortable .section').length;
  let counter = 0;
  let response = "";
  for (let i=0; i < sectionCount; i++) {
    if ($('#key' + i).val() || $('#utf' + i).val()) {
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
          if($(this).find('button').length > 0) {
            $(this).find('button').remove();
          }
        } else {
          if($(this).find('button').length < 1) {
            $("<button></button>").html("<i class='fas fa-times-circle'></i>").attr('id', "garbage" + i).attr('class', "garbage").attr('onclick', 'deleteSection(' + i + ')').appendTo($('.section:eq(' + i + ')'));
          }
        }
      });
    })
}

async function refereshForm() {
  await sleep(1);
  updateNames();
  operateGarbageButton();
}

function sleep(millisec) {
  return new Promise(resolve => setTimeout(resolve, millisec));
}

function changeOrder(i, event) {
  if ($('#sortable .section').length == 1) return;
  if (event.keyCode == 13) {
    var inputtedNumber = $('#order' + i).val();
    var maxNumber =  $('#sortable .section').length;
    if ( inputtedNumber < 1 || inputtedNumber > $('#sortable .section').length) {
      alert("please input the number 1 - " + maxNumber);
    } else {
      var insertIndex = $('#order' + i).val() - 1;
      $('#section' + insertIndex).before($('#section' + i));
      refereshForm();
    }
  }
}

function copy(element) {
  /* Get the text field */
  var copyText = document.getElementById(element);
  /* Select the text field */
  copyText.select();
  /* Copy the text inside the text field */
  document.execCommand("copy");
}
