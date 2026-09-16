const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { startGame } = require('./game');

const SAVE_PATH = path.join(__dirname, 'save.json');

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);

const menuItems = ['Start', 'Continue', 'Exit'];
let selected = 0;

function hasSave() {
  return fs.existsSync(SAVE_PATH);
}

function renderMenu() {
  console.clear();
  console.log('\x1b[36m%s\x1b[0m', '===================');
  console.log('\x1b[36m%s\x1b[0m', '     PIXEL QUEST   ');
  console.log('\x1b[36m%s\x1b[0m', '===================\n');

  menuItems.forEach((item, i) => {
    const disabled = item === 'Continue' && !hasSave();
    const arrow = i === selected ? '➤ ' : '  ';
    let label = item + (disabled ? '  (no save found)' : '');
    if (i === selected) {
      console.log(`\x1b[7m${arrow}${label}\x1b[0m`);
    } else {
      console.log(`${arrow}${label}`);
    }
  });

  console.log('\n↑ / ↓  navigate      Enter  select      Q  quit');
}

function onKey(str, key) {
  if (!key) return;

  if (key.name === 'up') {
    selected = (selected - 1 + menuItems.length) % menuItems.length;
    renderMenu();
  } else if (key.name === 'down') {
    selected = (selected + 1) % menuItems.length;
    renderMenu();
  } else if (key.name === 'return') {
    handleSelect();
  } else if (key.name === 'q' || (key.ctrl && key.name === 'c')) {
    exitApp();
  }
}

function handleSelect() {
  const item = menuItems[selected];

  if (item === 'Start') {
    process.stdin.removeListener('keypress', onKey);
    startGame({ x: 1, y: 1, score: 0 }, SAVE_PATH, backToMenu);
  } else if (item === 'Continue') {
    if (!hasSave()) {
      renderMenu();
      return;
    }
    process.stdin.removeListener('keypress', onKey);
    const state = JSON.parse(fs.readFileSync(SAVE_PATH, 'utf8'));
    startGame(state, SAVE_PATH, backToMenu);
  } else if (item === 'Exit') {
    exitApp();
  }
}

function backToMenu() {
  process.stdin.on('keypress', onKey);
  renderMenu();
}

function exitApp() {
  console.clear();
  console.log('Thanks for playing!');
  process.exit(0);
}

process.stdin.on('keypress', onKey);
renderMenu();
