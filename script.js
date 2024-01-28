// Game Constants and variable
let inputdir = { x: 0, y: 0 };
const foodSound = new Audio("food-music.mp3");
const directionSound = new Audio("direction-music.mp3");
const gameOverSound = new Audio("game-over-music.mp3");
const backgroundSound = new Audio("back-music.mp3");

let speed = 5;
let lasttime = 0;
let score = 0;
let snakearry = [
  {
    x: 13,
    y: 15,
  },
];
food = { x: 6, y: 7 };
// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lasttime) / 1000 < 1 / speed) {
    return;
  }
  lasttime = ctime;
  gameengine();
  console.log("hey");
}
function iscollide(snake) {
  // if you bump into your self
  for (let i = 1; i < snakearry.length; i++) {
    if (
      snakearry[i].x === snakearry[0].x &&
      snakearry[i].y === snakearry[0].y
    ) {
      return true;
    }
  }
  // if you bump into wall
  if (
    snakearry[0].x >= 25 ||
    snakearry[0].x <= 0 ||
    snakearry[0].y >= 25 ||
    snakearry[0].y <= 0
  ) {
    return true;
  }
}
// part1: updating the snake variables and food
function gameengine() {
  if (iscollide(snakearry)) {
    gameOverSound.play();
    backgroundSound.pause();
    inputdir = { x: 0, y: 0 };
    alert("Game over. please enter key to play again!");
    snakearry = [{ x: 13, y: 15 }];
    // backgroundSound.play()
    score = 0;
  }
  // if you have eaten food then updating snake and food
  if (snakearry[0].y === food.y && snakearry[0].x === food.x) {
    score += 1;
    if (score > hsvalue) {
      hsvalue = score;
      localStorage.setItem("hiscore", JSON.stringify(hsvalue));
      HighscoreBox.innerHTML = "HiScore : " + hsvalue;
    }
    scoreBox.innerHTML = "Score: " + score;
    foodSound.play();
    snakearry.unshift({
      x: snakearry[0].x + inputdir.x,
      y: snakearry[0].y + inputdir.y,
    });
    let a = 2;
    let b = 23;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  console.log("bhosale");
  // moving the snake
  for (let i = snakearry.length - 2; i >= 0; i--) {
    snakearry[i + 1] = { ...snakearry[i] };
  }
  console.log("Shashi");
  snakearry[0].x += inputdir.x;
  snakearry[0].y += inputdir.y;

  // part2: display the snake and food
  // display the snake and food

  board.innerHTML = "";
  snakearry.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    console.log("Shashikant");
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  foodElement = document.createElement("div");
  foodElement.style.gridColumnStart = food.x;
  foodElement.style.gridRowStart = food.y;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}
// High Score Updating
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hsvalue = 0;
  localStorage.setItem("hiscore", JSON.stringify(hsvalue));
} else {
  hsvalue = JSON.parse(hiscore);
  (HighscoreBox.innerHTML = "HiScore : "), hiscore;
}

// Game main logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  backgroundSound.play();
  inputdir = { x: 0, y: 1 }; // start the game
  directionSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputdir.x = 0;
      inputdir.y = -1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      inputdir.x = 0;
      inputdir.y = 1;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      inputdir.x = -1;
      inputdir.y = 0;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      inputdir.x = 1;
      inputdir.y = 0;
      break;

    default:
      break;
  }
});

// You can also use buttons for start and  play game :  You can play game on mobile withe help of buttons

let Left = document.getElementById("leftbtn");
let Right = document.getElementById("rightbtn");
let Top = document.getElementById("topbtn");
let Bottom = document.getElementById("bottombtn");

let x = function () {
  backgroundSound.play();
  directionSound.play();
  inputdir.x = -1;
  inputdir.y = 0;
};
Left.addEventListener("click", x);

let y = function () {
  backgroundSound.play();
  directionSound.play();
  inputdir.x = 1;
  inputdir.y = 0;
};
Right.addEventListener("click", y);

let z = function () {
  backgroundSound.play();
  directionSound.play();
  inputdir.x = 0;
  inputdir.y = -1;
};
Top.addEventListener("click", z);

let a = function () {
  backgroundSound.play();
  directionSound.play();
  inputdir.x = 0;
  inputdir.y = 1;
};
Bottom.addEventListener("click", a);
