<?php
 error_reporting(E_ERROR);
 error_reporting(E_ALL | E_STRICT);
 error_reporting(-1);
 ini_set('display_errors', 1);

require_once $_SERVER['DOCUMENT_ROOT'] . '/utf16generater/conversion.php';

$supported_language = array('zh' => 'Simplified Chinese', 'zh-Hans' => 'Traditional Chinese', 'ko' => 'Korean', 'hi' => 'Hindi', 'ja' => 'Japanese');



?>
<script src="manager.js"></script>
<script>
function translate1(word) {
  if (word.length == 0) {
    document.getElementById("translation0").innerHTML = "";
    return;
  } else {
    document.getElementById("translation0").setAttribute("value", "Hello World!");

    $.ajax({
      type: 'POST',
      url: 'conversion.php',
      data:{
        action:'translate',
      },
      dataType: 'json',
    })




    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("translation0").setAttribute("value", this.responseText);
        }
    };
    xmlhttp.open("GET", "conversion.php?q=" + word, true);
    xmlhttp.send();
  }
}

</script>
<h1>Translation & Conversion</h1>

<form>
  <form>
    Word: <input onkeyup="translate1(this.value)"></input>
  </form>
  <button id="convert">CONVERT</button>

<?php
  for($i=0; $i<count($supported_language); $i++) {
 ?>

  <div class="section">
    <?php echo "<select id='language" . $i . "'>"; ?>
    <?php
    foreach ($supported_language as $key=>$value) {
      echo "<option value='" . $key . "'>" . $value . "</option>";
    }
   ?>
    </select>
    <div>
      <td>Translation</td>
      <tl><input id='translation<?php echo $i; ?>'></input></tl>
    </div>
    <div>
      <td>UTF-16</td>
      <tl><input id='utf-16'></input></tl>
    </div>
  </div>

</div>

<?php } ?>

<button>FORMAT</button>

<div>
  <textarea id='code'></textarea>
</div>

</form>
