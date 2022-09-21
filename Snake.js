var blockSize = 10;
var rows = 60;
var cols = 60;
var context;
var board;
var Score = 0;

var snakeX = 20 * blockSize;
var snakeY = 20 * blockSize;

var foodX;
var foodY;

var speedX = 0;
var speedY = 0;

var snakeBody = [];

var gameOver = false;

var timer = 10;

window.onload = function () {
  board = document.getElementById("board");
  board.hight = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  spawnFood();
  //console.log(foodX, foodY);
  document.addEventListener("keyup", changeDirection);

  setInterval(update, 1000 / timer);
};

function update() {
  if (gameOver == true) {
    return;
  }
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.hight);

  //foods
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  //Score
  context.font = "20px Comic Sans MS";
  context.fillStyle = "white";
  context.fillText("Score: " + Score, 5, 20);

  if (snakeX == foodX && snakeY == foodY) {
    Score += 1;
    timer += 10;
    snakeBody.push([foodX, foodY]);
    spawnFood();
  }
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  //snake head
  context.fillStyle = "Lime";
  snakeX += speedX * blockSize;
  snakeY += speedY * blockSize;
  //snake body
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  //game over condition
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over!");
    }
  }
  //out of boudary condition
  if (snakeX > cols * blockSize) {
    snakeX = 0;
  }
  if (snakeX < 0) {
    snakeX = cols * blockSize;
  }
  if (snakeY > rows * blockSize) {
    snakeY = 0;
  }
  if (snakeY < 0) {
    snakeY = rows * blockSize;
  }
}

function spawnFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(e) {
  //console.log(e.code);
  if (e.code == "ArrowUp" && speedY != 1) {
    speedX = 0;
    speedY = -1;
  } else if (e.code == "ArrowDown" && speedY != -1) {
    speedX = 0;
    speedY = 1;
  } else if (e.code == "ArrowLeft" && speedX != 1) {
    speedX = -1;
    speedY = 0;
  } else if (e.code == "ArrowRight" && speedX != -1) {
    speedX = 1;
    speedY = 0;
  }
}
