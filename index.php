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
  </head>

  <body>
    <div id="indicator">
      <p id="processing"></p>
      <i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
    </div>
    <header>
      <h1>Translation & Conversion</h1>
    </header>
    <main>
        <section id=inputted>
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
          <div class="word-input">
            <input type="text" id="word" placeholder="type word">
            <span onclick="clearWord()"><i class="fas fa-times-circle"></i></span>
          </div>
      </section>

      <div class="table-container">
        <div class="table">

          <div class='sortable-header'>
            <div class="order">order</div>
            <div class="language">language</div>
            <div class="key">key</div>
            <div class="translation">Translation</div>
            <div class="conversion">UTF-16</div>
          </div>

          <div id="sortable">

            <div class='section' id='section0' onmouseup="refereshForm()">
              <div class="order"><input type="text" id='order0' value=1 maxlength="4" onkeypress="return changeOrder(0, event)"></div>
              <div class="language">
                <select id='language0' onchange='languageSelected(0)'>
                <option value="">select language</option>
                <?php
                foreach ($supported_language as $key=>$value) {
                  echo "<option value='$key'>$value</option>";
                }
                ?>
                </select>
              </div>
              <div class="key"><input type="text" id='lan-key0'></div>
              <div class="translation">
                <input type="text" id='translation0'>
                <div class="copy-button">
                  <span class="translation-copy" onclick="copy('translation0')"><i class="far fa-copy"></i></span>
                  <div class="wrap-arrow"><span class="arrow_box">copy</span></div>
                </div>
              </div>
              <div class="conversion">
                <input type="text" id='utf0'>
                <div class="copy-button">
                  <span class="utf-copy" onclick="copy('utf0')"><i class="far fa-copy"></i></span>
                  <div class="wrap-arrow"><span class="arrow_box">copy</span></div>
              </div>
            </div>

          </div>

        </div>
        <button id="add-section" onclick="addSection()"><i class="fas fa-plus-circle"></i></button>
      </div>
    </div>


    <div class="buttons">
      <button id="translate" onclick="translate1()">Translate</button>

      <button id="convert" onclick="translationToFormat()">Translation<span><i class="fas fa-arrow-right"></i></span>UTF16</button>

      <button id="format" onclick="format()">REFORMAT</button>
    </div>

    <div class="formatted">
      <textarea id='code' rows="10" cols="100"></textarea>
    </div>

    </main>
  </body>
</html>
