// create a canvas to work with,
var canvas = document.createElement('canvas');
window.onload = function() {
    document.body.appendChild(canvas);
}

const MAP_WIDTH = 736;
const MAP_HEIGHT = 480;
const FPS = 30;
var LEVEL = 0;
var SCORE = 0;
var UP = false;
var DOWN = false;
var LEFT = false;
var RIGHT = false;
var FIRE = false;
var DEBUG = true;

// add a listener to event
document.addEventListener("keydown", function(event) {
    if (event.code === "KeyW") {
        UP = true;
        //console.log("The 'a' key is pressed!");
    }
    else if (event.code === "KeyS") {
        DOWN = true;
        //console.log("The 'a' key is pressed!");
    }
    else if (event.code === "KeyA") {
        LEFT = true;
        //console.log("The 'a' key is pressed!");
    }
    else if (event.code === "KeyD") {
        RIGHT = true;
        //console.log("The 'a' key is pressed!");
    }

    if(event.code === "KeyM") {
        console.log("Firing");
        FIRE = true;
    }

    if(event.code === "KeyT") {
        DEBUG = !DEBUG;
    }
});

document.addEventListener("keyup", function(event) {
    if (event.code === "KeyW") {
        UP = false;
        //console.log("The 'a' key is pressed!");
    }
    if (event.code === "KeyS") {
        DOWN = false;
        //console.log("The 'a' key is pressed!");
    }
    if (event.code === "KeyA") {
        LEFT = false;
        //console.log("The 'a' key is pressed!");
    }
    if (event.code === "KeyD") {
        RIGHT = false;
        //console.log("The 'a' key is pressed!");
    }
    //Seperate Action
    if(event.code === "KeyM") {
        FIRE = false;
    }
});

// style canvas
canvas.id = "canvas";
canvas.width = MAP_WIDTH;
canvas.height = MAP_HEIGHT;
canvas.setAttribute("style", "border: 1px solid black;");

var player = {
    x:0,
    y:0,
    w: 25,
    h: 25,
    color: "blue", 
    face: "Down", 
    speed: 0, 
    speedRate: 0.25,
    maxSpeed: 7,
    health: 100 
};

function combineRectangles(rectangles) {
    const result = [];
    console.info("Total Rectangle : " + rectangles.length);
    rectangles.forEach(rectangle => {
        let combined = false;

        result.forEach(combinedRect => {
            if (
                (rectangle.x === combinedRect.x && rectangle.w === combinedRect.w &&
                (rectangle.y + rectangle.h === combinedRect.y || combinedRect.y + combinedRect.h === rectangle.y)) ||
                (rectangle.y === combinedRect.y && rectangle.h === combinedRect.h &&
                (rectangle.x + rectangle.w === combinedRect.x || combinedRect.x + combinedRect.w === rectangle.x))
            ) {
                combinedRect.x = Math.min(rectangle.x, combinedRect.x);
                combinedRect.y = Math.min(rectangle.y, combinedRect.y);
                combinedRect.w = Math.max(rectangle.x + rectangle.w, combinedRect.x + combinedRect.w) - combinedRect.x;
                combinedRect.h = Math.max(rectangle.y + rectangle.h, combinedRect.y + combinedRect.h) - combinedRect.y;
                combined = true;
            }
        });

        if (!combined) {
            result.push({ ...rectangle });
        }
    });
    console.info("Total Rectangle after combined: " + result.length);
    return result;
}

function drawCombinedRectangles(context, combinedRectangles) {
    combinedRectangles.forEach(rectangle => {
        //context.fillRect(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
	context.strokeStyle = 'red';
	context.rect(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
        context.stroke();
    });
}

function createBorder(maxGridWidth, maxGridHeight, gridSize) {
    createHorizontalBlock(0, maxGridWidth - 1, 0, gridSize);
    createHorizontalBlock(0, maxGridWidth - 1, maxGridHeight - 1, gridSize);
    createVerticalBlock(1, maxGridHeight - 2, 0, gridSize);
    createVerticalBlock(1, maxGridHeight - 2, maxGridWidth - 1, gridSize);
}

function createHorizontalBlock(startX, endX, y, gridSize) {
    for (let x = startX; x <= endX; x++) {
        rectangles.push({ x: x * gridSize, y: y * gridSize, w: gridSize, h: gridSize });
    }
}

function createVerticalBlock(startY, endY, x, gridSize) {
    for (let y = startY; y <= endY; y++) {
        rectangles.push({ x: x * gridSize, y: y * gridSize, w: gridSize, h: gridSize });
    }
}

// Test here canvas already created above
//const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

const gridSize = 32;
const maxGridWidth = 23;
const maxGridHeight = 15;

const rectangles = [
    //{ x: 0 * gridSize, y: 0 * gridSize, w: gridSize , h: gridSize },
    //{ x: 0 * gridSize, y: 4 * gridSize, w: gridSize , h: gridSize },
    //{ x: 1 * gridSize, y: 0 * gridSize, w: gridSize , h: gridSize },
    //{ x: 2 * gridSize, y: 0 * gridSize, w: gridSize , h: gridSize },
    //{ x: 0 * gridSize, y: 5 * gridSize, w: gridSize , h: gridSize },
    //{ x: 3 * gridSize, y: 9 * gridSize, w: gridSize , h: gridSize },
    //{ x: 3 * gridSize, y: 10 * gridSize, w: gridSize , h: gridSize },
    //{ x: 4 * gridSize, y: 10 * gridSize, w: gridSize , h: gridSize },
    //{ x: 5 * gridSize, y: 10 * gridSize, w: gridSize , h: gridSize },
    //{ x: 6 * gridSize, y: 10 * gridSize, w: gridSize , h: gridSize }
];

createBorder(maxGridWidth, maxGridHeight, gridSize);
createHorizontalBlock(1, maxGridWidth - 6, 8, gridSize)
createVerticalBlock(9, 11, maxGridWidth - 6, gridSize)
const combinedRectangles = combineRectangles(rectangles);

setInterval(run, 1000 / FPS);

function run() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(DEBUG)
	drawCombinedRectangles(context, combinedRectangles);

    updatePlayer();
}

function updatePlayer() {
    //console.log("Player speed : " + player.speed);
    if(UP)
    {
	player.y -= player.speed;
	player.speed = player.speed + player.speedRate >= player.maxSpeed ? player.maxSpeed : player.speed + player.speedRate;
    }
    else if(DOWN)
    {
	player.y += player.speed;
	player.speed = player.speed + player.speedRate >= player.maxSpeed ? player.maxSpeed : player.speed + player.speedRate;
    }
    else if(LEFT)
    {
	player.x -= player.speed;
	player.speed = player.speed + player.speedRate >= player.maxSpeed ? player.maxSpeed : player.speed + player.speedRate;
    }
    else if(RIGHT)
    {
	player.x += player.speed;
	player.speed = player.speed + player.speedRate >= player.maxSpeed ? player.maxSpeed : player.speed + player.speedRate;
    }
    else
	player.speed = 0;

    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.w, player.h);
}