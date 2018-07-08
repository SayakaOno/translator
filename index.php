<?php
 error_reporting(E_ERROR);
 error_reporting(E_ALL | E_STRICT);
 error_reporting(-1);
 ini_set('display_errors', 1);

require_once $_SERVER['DOCUMENT_ROOT'] . '/utf16generater/conversion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/utf16generater/supported-language.php';
$userBrowserLanguage = $_SERVER['HTTP_ACCEPT_LANGUAGE'] ? $_SERVER['HTTP_ACCEPT_LANGUAGE'] : NULL;
if ($userBrowserLanguage) {
  $userBrowserLanguage = substr($userBrowserLanguage, 0, strpos($userBrowserLanguage, ','));
}
if (!$userBrowserLanguage || !array_key_exists($userBrowserLanguage, $supported_language)) {
  $userBrowserLanguage = 'en';
}
?>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="manager.js"></script>
<script type="text/javascript">
    var supported_language = <?php echo json_encode($supported_language); ?>;
</script>
<h1>Translation & Conversion</h1>

<form>
  <select id="original-language">
    <?php
    foreach ($supported_language as $key=>$value) {
      if ($key == $userBrowserLanguage) {
        $defaultSetting = " selected";
      } else {
        $defaultSetting = "";
      }
      echo "<option value='$key' $defaultSetting>$value</option>";
    }
   ?>
  </select>
  <form>
    Word: <input id="word" onkeyup="translate1(this.value)"></input>
  </form>

<div id="sections">

<?php
  for($i=0; $i<5; $i++) {
 ?>

  <div class="section">
    <?php echo "<select id='language" . $i . "' onchange='languageSelected(" . $i .")'>"; ?>
    <option value="">select language</option>
    <?php
    foreach ($supported_language as $key=>$value) {
    //TODO: when the original language is changed, this should be refreshed.
      // if ($key == $userBrowserLanguage) continue;
      echo "<option value='$key'>$value</option>";
    }
   ?>
    </select>
    <?php echo "<dl>key: </dl><dt><input id='lan-key$i'></input></dt>"; ?>
    <div>
      <td>Translation</td>
      <tl><input id='translation<?php echo $i; ?>'></input></tl>
    </div>
    <div>
      <td>UTF-16</td>
      <tl><input id='utf-16'></input></tl>
    </div>
  </div>

<?php } ?>

</div>

<button id="convert">CONVERT</button>

<div>
  <textarea id='code'></textarea>
</div>

</form>
