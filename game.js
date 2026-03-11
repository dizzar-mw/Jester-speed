const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let carX = 180;
let carWidth = 40;
let carHeight = 80;

let obstacles = [];
let score = 0;
let speed = 4;
let gameRunning = false;

let playerName = "";

function greetingMessage(name){

let hour = new Date().getHours();
let greet = "Hello";

if(hour < 12) greet = "Good Morning";
else if(hour < 18) greet = "Good Afternoon";
else greet = "Good Evening";

return greet + " " + name + "!";
}

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

function drawCar(){
ctx.fillStyle = "orange";
ctx.fillRect(carX, 500, carWidth, carHeight);
}

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

function gameOver(){

gameRunning = false;

let high = localStorage.getItem("highScore") || 0;

if(score > high){
localStorage.setItem("highScore", score);
}

alert("Game Over! Score: "+score);

location.reload();
}

document.addEventListener("keydown", e=>{

if(e.key === "ArrowLeft") carX -= 30;
if(e.key === "ArrowRight") carX += 30;

});

function gameLoop(){

if(!gameRunning) return;

ctx.clearRect(0,0,canvas.width,canvas.height);

drawCar();
drawObstacles();
detectCollision();

if(Math.random() < 0.03){
createObstacle();
}

score++;
speed += 0.002;

document.getElementById("score").textContent = score;

requestAnimationFrame(gameLoop);

}
