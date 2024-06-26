// Canvas API = a means for drawing graphics
// used for animations, games, data visualization

let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

//DRAW LINES
/*
context.strokeStyle = "blue"
context.lineWidth = 10;
context.beginPath();
context.moveTo(0, 0);
context.lineTo(250, 250);
context.lineTo(250, 500);
context.moveTo(0, 0);
context.moveTo(500, 0);
context.lineTo(250, 250);

context.stroke();
*/
//DRAW TRIANGLE
/*
context.strokeStyle = "grey";
context.fillStyle = "yellow";
context.lineWidth = 10;
context.beginPath();
context.moveTo(250, 0);
context.lineTo(0, 250);
context.lineTo(500, 250);
context.lineTo(250, 0);
context.stroke();
context.fill();
*/
//DRAW RECTANGLE
/*
context.fillStyle = "black";
context.fillRect(0, 0, 250, 250);
context.strokeStyle = "black";
context.strokeRect(0, 0, 250, 250);

context.fillStyle = "red";
context.fillRect(0, 250, 250, 250);
context.strokeStyle = "black";
context.strokeRect(0, 250, 250, 250);

context.fillStyle = "green";
context.fillRect(250, 250, 250, 250);
context.strokeStyle = "black";
context.strokeRect(250, 250, 250, 250);

context.fillStyle = "blue";
context.fillRect(250, 0, 250, 250);
context.strokeStyle = "black";
context.strokeRect(250, 0, 250, 250);
*/
//DRAW CIRCLE
//(x, y, r, sAngle, eAngle, counterclockwise)
/*
context.fillStyle = "lightblue";
context.strokeStyle = "darkblue";
context.lineWidth = 10;
context.beginPath();
context.arc(250, 250, 100, 0, 2 * Math.PI);
context.stroke();
context.fill();
*/
//DRAW TEXT
/*
context.font = "50px Comic Sans MS";
context.fillStyle = "grey";
context.textAlign = "center";
context.fillText("YOU WIN!", canvas.width / 2, canvas.height / 2);
*/
// drawing yellow triangle
context.beginPath();
context.fillStyle = "yellow";
context.lineWidth = 2;
context.moveTo(250, 0);
context.lineTo(0, 250);
context.lineTo(500, 250);
context.lineTo(250, 0);
context.fill();
context.stroke();
// drawing eyes. UPD: can't, layer isn't displayed
/*
context.beginPath();
context.arc(100, 100, 0, 2 * Math.PI);
context.fill();
context.stroke();
*/