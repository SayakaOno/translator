# Translator
![translator1](https://user-images.githubusercontent.com/33141219/53115577-707a2700-34fb-11e9-8611-e10fbbbb0850.gif)<br/>
Translator is a web application that translates the given word into multiple languages and formats them to JSON. In order to prevent from mojibake when database is used, the given word is converted to UTF-16.<br/>
[DEMO](https://translator-81.herokuapp.com)

## How to use
- Type a word you want to translate
- Select language you want to translate to
- Click "Translate" and "->UTF16" buttons

## Key Features
- The default language is the same as the language of your browser.
- You can translate a word to as many languages as you want.
- You can change the order of the results by drag & drop or input a number
![translator2](https://user-images.githubusercontent.com/33141219/53115626-90a9e600-34fb-11e9-819a-b241ccdbf3c2.gif)

## Specification
Library: [PHP GoogleTranslate free](https://github.com/statickidz/php-google-translate-free)
