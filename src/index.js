const home = require('./styles/app.css');
const styles = { home };
const Elm = require('./Main');

const state = { styles, swap: false };
const app = Elm.embed(Elm.Main, document.getElementById('main'), state);
