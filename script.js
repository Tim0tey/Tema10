function setup() {
  createCanvas(800, 500);
  textAlign(CENTER, CENTER);
}
let gameState = 'start';
let StartGame;
let greenGame;
let reactionGame;
let showButton = true;

function drawButton() {
  fill('violet');
  rect(width / 2 - 80, 150, 160, 50, 10);
  fill(255);
  text('Start', width / 2, 175);
}

function draw() {
  if (gameState === 'start') {
    background(255);
    fill(0);
    if (showButton) drawButton();
  } else if (gameState === 'waiting') {
    background('grey');
    fill(0);
    text('Asteapta culoarea verde...', width / 2, height / 2);
  } else if (gameState === 'ready') {
    background('green');
    fill(255);
    text('Apasa CLICK!', width / 2, height / 2);
  } else if (gameState === 'tooSoon') {
    background('red');
    fill(255);
    text('Prea devreme!Incearca din nou.', width / 2, height / 2);
  } else if (gameState === 'result') {
    background(255);
    fill(0);
    text('Rezultat' + reactionGame, width / 2, height / 2);
    text('Reporneste cu CLICK sau apasa R', width / 2, height / 2 + 40);
  }
}

function mousePressed() {
  if (gameState === 'start') {
    if (
      mouseX > width / 2 - 80 &&
      mouseX < width / 2 + 80 &&
      mouseY > 150 &&
      mouseY < 200
    )
      startWaiting();
  } else if (gameState === 'ready') {
    reactionGame = millis() - greenGame;
    gameState = 'result';
  } else if (gameState === 'waiting') {
    gameState = 'tooSoon';
  } else if (gameState === 'tooSoon' || gameState === 'result') resetGame();
}

function keyPressed() {
  console.log('key', key);
  if (gameState === 'start' && key === ' ') {
    startWaiting();
  }
  if (gameState === 'ready' && key === ' ') {
    reactionGame = millis() - greenGame;
    gameState = 'result';
  }
  if (
    (key === 'r' || key === 'R') &&
    (gameState === 'tooSoon' || gameState === 'result')
  )
    resetGame();
}

function startWaiting() {
  gameState = 'waiting';
  showButton = false;
  waitStartTime = millis();
  infoText = 'Asteapta culoarea verde...';
  let delay = random(2000, 5000);
  setTimeout(() => {
    greenGame = millis();
    gameState = 'ready';
    infoText = 'CLICK!';
  }, delay);
}

function resetGame() {
  gameState = 'start';
  showButton = true;
  reactionGame = 0;
}