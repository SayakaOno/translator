<?php
 error_reporting(E_ERROR);
 error_reporting(E_ALL | E_STRICT);
 error_reporting(-1);
 ini_set('display_errors', 1);


require_once $_SERVER['DOCUMENT_ROOT'] . '/utf16generater/conversion.php';

$supported_language = array('zh' => 'Simplified Chinese', 'zh-Hans' => 'Traditional Chinese', 'ko' => 'Korean', 'hi' => 'Hindi', 'ja' => 'Japanese');

?>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="manager.js"></script>

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
