<?php
 error_reporting(E_ERROR);
 error_reporting(E_ALL | E_STRICT);
 error_reporting(-1);
 ini_set('display_errors', 1);

require_once $_SERVER['DOCUMENT_ROOT'] . '/utf16generater/vendor/autoload.php';

use \Statickidz\GoogleTranslate;

$action = filter_input(INPUT_POST, 'action');
switch ($action) {
    case 'translate':
        $word = filter_input(INPUT_POST, 'word');
        $original = filter_input(INPUT_POST, 'originalLanguage');
        $target = filter_input(INPUT_POST, 'targetLanguage');
        die(translate($original, $target, $word));
        break;
    case 'convert':
        $str = filter_input(INPUT_POST, 'string');
        return unicode_decode($str);
        break;
}

function translate($original, $target, $text) {
  $trans = new GoogleTranslate();
  $result = $trans->translate($original, $target, $text);
  return $result;
}

function unicode_decode($str) {
  die(preg_replace_callback("/((?:[^\x09\x0A\x0D\x20-\x7E]{3})+)/", "decode_callback", $str));
}

function decode_callback($matches) {
  $char = mb_convert_encoding($matches[1], "UTF-16", "UTF-8");
  $escaped = "";
  for ($i = 0, $l = strlen($char); $i < $l; $i += 2) {
    $escaped .=  "\u" . sprintf("%02x%02x", ord($char[$i]), ord($char[$i+1]));
  }
  return $escaped;
}
