const fs = require('fs');

const WIDTH = 12;
const HEIGHT = 8;

// grid values: 0 = empty, 1 = wall, 2 = coin
function buildLevel() {
  const grid = Array.from({ length: HEIGHT }, () => Array(WIDTH).fill(0));

  for (let x = 0; x < WIDTH; x++) {
    grid[0][x] = 1;
    grid[HEIGHT - 1][x] = 1;
  }
  for (let y = 0; y < HEIGHT; y++) {
    grid[y][0] = 1;
    grid[y][WIDTH - 1] = 1;
  }

  const walls = [[2, 3], [2, 4], [2, 5], [5, 7], [5, 8], [3, 9], [6, 5]];
  walls.forEach(([y, x]) => (grid[y][x] = 1));

  const coins = [[1, 5], [3, 2], [4, 8], [6, 3], [6, 9], [1, 9]];
  coins.forEach(([y, x]) => (grid[y][x] = 2));

  return grid;
}

const PIXEL = {
  wall: '\x1b[44m  \x1b[0m',   // blue
  empty: '\x1b[40m  \x1b[0m',  // black
  coin: '\x1b[43m  \x1b[0m',   // yellow
  player: '\x1b[41m  \x1b[0m' // red
};

function render(grid, player, score) {
  console.clear();
  console.log('\x1b[36m%s\x1b[0m', `PIXEL QUEST  —  Score: ${score}`);
  console.log();

  for (let y = 0; y < HEIGHT; y++) {
    let row = '';
    for (let x = 0; x < WIDTH; x++) {
      if (player.x === x && player.y === y) {
        row += PIXEL.player;
      } else if (grid[y][x] === 1) {
        row += PIXEL.wall;
      } else if (grid[y][x] === 2) {
        row += PIXEL.coin;
      } else {
        row += PIXEL.empty;
      }
    }
    console.log(row);
  }

  console.log('\nArrows move   ·   ESC save & return to menu   ·   Q quit');
}

function startGame(state, savePath, onExitToMenu) {
  const grid = buildLevel();
  const player = { x: state.x || 1, y: state.y || 1 };
  let score = state.score || 0;

  render(grid, player, score);

  function onKey(str, key) {
    if (!key) return;

    let nx = player.x;
    let ny = player.y;

    if (key.name === 'up') ny -= 1;
    else if (key.name === 'down') ny += 1;
    else if (key.name === 'left') nx -= 1;
    else if (key.name === 'right') nx += 1;
    else if (key.name === 'escape') {
      saveAndExit();
      return;
    } else if (key.name === 'q' || (key.ctrl && key.name === 'c')) {
      console.clear();
      console.log('Thanks for playing!');
      process.exit(0);
    } else {
      return;
    }

    if (grid[ny] && grid[ny][nx] !== 1) {
      player.x = nx;
      player.y = ny;
      if (grid[ny][nx] === 2) {
        grid[ny][nx] = 0;
        score += 10;
      }
    }

    render(grid, player, score);
  }

  function saveAndExit() {
    process.stdin.removeListener('keypress', onKey);
    fs.writeFileSync(
      savePath,
      JSON.stringify({ x: player.x, y: player.y, score })
    );
    onExitToMenu();
  }

  process.stdin.on('keypress', onKey);
}

module.exports = { startGame };
