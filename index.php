<?php
 error_reporting(E_ERROR);
 error_reporting(E_ALL | E_STRICT);
 error_reporting(-1);
 ini_set('display_errors', 1);

require_once 'conversion.php';
require_once 'supported-language.php';
$userBrowserLanguage = $_SERVER['HTTP_ACCEPT_LANGUAGE'] ? $_SERVER['HTTP_ACCEPT_LANGUAGE'] : NULL;
if ($userBrowserLanguage) {
  $userBrowserLanguage = substr($userBrowserLanguage, 0, strpos($userBrowserLanguage, ','));
}
if (!$userBrowserLanguage || !array_key_exists($userBrowserLanguage, $supported_language)) {
  $userBrowserLanguage = 'en';
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Translator</title>
      <link rel="stylesheet" href="style.css">
      <script src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
      <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
      <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
      <script src="manager.js"></script>
      <script type="text/javascript">
          var supported_language = <?php echo json_encode($supported_language); ?>;
      </script>
      <style>
      .ui-state-highlight { height: 1.5em; line-height: 1.2em; }
      </style>
      <script>
      $( function() {
        $( "#sortable" ).sortable({
          placeholder: "ui-state-highlight"
        });
        $( "#sortable" ).disableSelection();
      });



      </script>
  </head>

  <body>
    <header>
      <h1>Translation & Conversion</h1>
    </header>
    <main>
      <!-- <form> -->
        <section id=inputted>
          <div>
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
          <!-- <form> -->
            <dl>Word:</dl><dt><input id="word"></dt>
          </div>
          <button id="translate" onclick="translate1()">Translate</button>
        <!-- </form> -->
      </section>

      <div id="sortable">

        <div class='section' id='section0' onmouseup="refereshForm()">
          <div class="language-key">
            <select id='language0' onchange='languageSelected(0)'>
            <option value="">select language</option>
            <?php
            foreach ($supported_language as $key=>$value) {
            //TODO: when the original language is changed, this should be refreshed.
              // if ($key == $userBrowserLanguage) continue;
              echo "<option value='$key'>$value</option>";
            }
           ?>
            </select>
              <dl>key: </dl><dt><input id='lan-key0'></dt>
            </div>
          <div class="translation">
            <td>Translation</td>
            <tl><input id='translation0'></tl>
          </div>
          <div class="conversion">
            <td>UTF-16</td>
            <tl><input id='utf0' size="50"></tl>
          </div>
        </div>

      </div>

      <button id="add-section" onclick="addSection()">Add</button>

      <button id="convert" onclick="convert()">CONVERT</button>

      <button id="format" onclick="format()">FORMAT</button>

      <div>
        <textarea id='code' rows="10" cols="100"></textarea>
      </div>

      <!-- </form> -->
    </main>
  </body>
</html>
