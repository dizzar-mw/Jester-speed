const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let carX = 180;
let carWidth = 40;
let carHeight = 80;

let obstacles = [];
let score = 0;
let speed = 4;
let gameRunning = false;

let moveLeft = false;
let moveRight = false;

let playerName = "";

/* GREETING */

function greetingMessage(name){

let hour = new Date().getHours();
let greet = "Hello";

if(hour < 12) greet = "Good Morning";
else if(hour < 18) greet = "Good Afternoon";
else greet = "Good Evening";

return greet + " " + name + "!";
}

/* START GAME */

function startGame(){

playerName = document.getElementById("playerName").value;

if(playerName === ""){
alert("Enter your name");
return;
}

document.getElementById("username").textContent = playerName;

document.getElementById("greeting").textContent = greetingMessage(playerName);

document.getElementById("startScreen").classList.add("hidden");
document.getElementById("gameUI").classList.remove("hidden");

let high = localStorage.getItem("highScore") || 0;
document.getElementById("highScore").textContent = high;

gameRunning = true;

requestAnimationFrame(gameLoop);
}

/* DRAW CAR */

function drawCar(){

ctx.fillStyle = "orange";
ctx.fillRect(carX, 500, carWidth, carHeight);

}

/* OBSTACLES */

function createObstacle(){

let x = Math.random() * (canvas.width - 40);

obstacles.push({
x:x,
y:-80
});

}

function drawObstacles(){

ctx.fillStyle="aqua";

obstacles.forEach(o=>{
ctx.fillRect(o.x,o.y,40,80);
o.y += speed;
});

}

/* COLLISION */

function detectCollision(){

for(let o of obstacles){

if(
carX < o.x + 40 &&
carX + carWidth > o.x &&
500 < o.y + 80 &&
500 + carHeight > o.y
){
gameOver();
}

}

}

/* GAME OVER */

function gameOver(){

gameRunning = false;

let high = localStorage.getItem("highScore") || 0;

if(score > high){
localStorage.setItem("highScore", score);
}

alert("Game Over! Score: "+score);

location.reload();

}

/* KEYBOARD */

document.addEventListener("keydown", e=>{
if(e.key === "ArrowLeft") moveLeft = true;
if(e.key === "ArrowRight") moveRight = true;
});

document.addEventListener("keyup", e=>{
if(e.key === "ArrowLeft") moveLeft = false;
if(e.key === "ArrowRight") moveRight = false;
});

/* TOUCH CONTROLS */

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

function startLeft(){ moveLeft = true; }
function stopLeft(){ moveLeft = false; }

function startRight(){ moveRight = true; }
function stopRight(){ moveRight = false; }

/* LEFT BUTTON */

leftBtn.addEventListener("touchstart", startLeft);
leftBtn.addEventListener("touchend", stopLeft);
leftBtn.addEventListener("mousedown", startLeft);
leftBtn.addEventListener("mouseup", stopLeft);
leftBtn.addEventListener("mouseleave", stopLeft);

/* RIGHT BUTTON */

rightBtn.addEventListener("touchstart", startRight);
rightBtn.addEventListener("touchend", stopRight);
rightBtn.addEventListener("mousedown", startRight);
rightBtn.addEventListener("mouseup", stopRight);
rightBtn.addEventListener("mouseleave", stopRight);

/* GAME LOOP */

function gameLoop(){

if(!gameRunning) return;

ctx.clearRect(0,0,canvas.width,canvas.height);

/* MOVE CAR */

if(moveLeft) carX -= 6;
if(moveRight) carX += 6;

/* KEEP CAR IN SCREEN */

if(carX < 0) carX = 0;
if(carX > canvas.width - carWidth) carX = canvas.width - carWidth;

drawCar();
drawObstacles();
detectCollision();

/* SPAWN OBSTACLES */

if(Math.random() < 0.03){
createObstacle();
}

/* SCORE + SPEED */

score++;
speed += 0.002;

document.getElementById("score").textContent = score;

requestAnimationFrame(gameLoop);

}
