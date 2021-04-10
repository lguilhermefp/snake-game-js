let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
  x: 8*box,
  y: 8*box
}
let direction = "right";
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

function background(){
  context.fillStyle = "red";
  context.fillRect(0, 0, 16*box, 16*box);
}

function snakeFn(){
  for(i=0; i<snake.length; i++){
    context.fillStyle = "blue";
    context.fillRect(snake[i].x, snake[i].y , box, box);
  }
}

document.addEventListener("keydown", update);

function update(e){
  if(e.keyCode == 37 && direction !== "right") direction = "left";
  if(e.keyCode == 39 && direction !== "left") direction = "right";
  if(e.keyCode == 38 && direction !== "down") direction = "up";
  if(e.keyCode == 40 && direction !== "up") direction = "down";
}

start = () => {
  if((snake[0].x > 15 * box && direction == "right") || (snake[0].y > 15 * box && direction == "down") || (snake[0].x < 0 && direction == "left") || (snake[0].y < 0 && direction == "up")) gameOver();

  for(i=1; i<snake.length; i++)
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) gameOver();


  gameOver = () => {
    clearInterval(game);
    alert("game over");
  }

  background();
  foodFn();
  snakeFn();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(direction === "right")snakeX += box;
  if(direction === "left")snakeX -= box;
  if(direction === "up")snakeY -= box;
  if(direction === "down")snakeY += box;

  if(snakeX != food.x || snakeY != food.y)snake.pop();
  else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }


  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead);
}

foodFn = () => {
  context.fillStyle = "green";
  context.fillRect(food.x, food.y, box, box)
}

let game = setInterval(start, 80);
