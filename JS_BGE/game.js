// create a canvas to work with,
var canvas = document.createElement('canvas');
window.onload = function() {
    document.body.appendChild(canvas);
}

var MAP_WIDTH = 800;
var MAP_HEIGHT = 500;
var LEVEL = 0;
var SCORE = 0;

var UP = false;
var DOWN = false;
var LEFT = false;
var RIGHT = false;
var FIRE = false;

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

// Stat
// mini health bar
var miniHealthBar = function() {
    x = 0;
    y = 0;
    width = 70;
    height = 5;
    ratio = 0;
    percent = 0;
    filledWidth = 0;
};

// health bar dimensions
var healthBar = {
    x: 10,
    y: 20,
    width: 150,
    height: 20
};

const FACE_DIR = Object.freeze({
    UP_DIR : "Up",
    DOWN_DIR : "Down",
    LEFT_DIR : "Left",
    RIGHT_DIR : "Right",
});

var xd = 0;
var yd = 0;

// get 2D context
var context = canvas.getContext('2d');
var maxBullet = 5;
var currentBullet = 0;
var maxEnemy = 2;
var currentEnemy = 0;
var emptySlot = 0;
//var enemy = {x:150, y:150, width: 100, height: 100 };
//var enemy = {x:150, y:150, width: 25, height: 25, color: "green", face: "Down", speed: 2, health: 500 };
var player = {x:10, y:30, width: 25, height: 25, color: "blue", face: "Down", speed: 4, health: 100 };
//var bullet[10];
//var bullet = null;

var EandB = function() {
    x = 0;
    y = 0; 
    width = 10; 
    height = 10;
    color = "red"
    face = "Down"
    speed = 3;
    health = 50
};

var bullets = [];
var enemies = [];
var enemieshb = [];
//var bullet = {x:0, y:0, width: 10, height: 10, color: "red", face: "Down", speed: 3, health: 10};
var maxHealth = 100;
//var health = 100;
var ratio = player.health/maxHealth;
var percent = ratio * 100;
var fillWidth = healthBar.width * ratio;

var maxEnemyHealth = 500;
//var enemyRatio = enemy.health/maxEnemyHealth;
//var enemyPercent = enemyRatio * 100;
//var enemyFillWidth = miniHealthBar.width * enemyRatio;

// place holders for mouse x,y position
var mouseX = 0;
var mouseY = 0;

// Loop
setInterval(onTimerTick, 33);

function targetMovementUpdate(target)
{
    if(target.face == FACE_DIR.UP_DIR)
    {
        target.y -= target.speed;
    }
    else if(target.face == FACE_DIR.DOWN_DIR)
    {
        //console.log("Downing");
        target.y += target.speed;
    }
    else if(target.face == FACE_DIR.LEFT_DIR)
    {
        target.x -= target.speed;
    }
    else if(target.face == FACE_DIR.RIGHT_DIR)
    {
        target.x += target.speed;
    }
}

function bulletMoveUpdate(bullet)
{
    //var bullet = {x:0, y:0, width: 10, height: 10, color: "red", face: "Down", speed: 3, health: 10};
    //if(FIRE)

    if(bullet != null)
    {
        targetMovementUpdate(bullet);

        bullet.health--;
        //console.log("Bullet health : " + bullet.health);
        //if(bullet.health <= 0)
        //{
            //bullet = null;
        //    delete bullet;
        //    currentBullet--;
        //}

        //console.log("Bullet X : " + bullet.x, + " , " + " Y : " + bullet.y);
    }  
    //console.log("Not bulleting");
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getEmptySlot()
{
    for(i = 0; i < maxEnemy; i++)
        if(enemies[i] == null )
            return i;
    return -1;
}

function spawnEnemy()
{
    var boss = false;
    if((currentEnemy < maxEnemy) && (emptySlot >= 0))
    {
        if(getRandomInt(0, 10) == 1)
            boss = true;
        console.log("Spawning creature");
        var enemy = new EandB();
        enemy.x = getRandomInt(0, MAP_WIDTH);
        enemy.y = getRandomInt(0, MAP_HEIGHT);
        enemy.width = boss ? 55 : 25;
        enemy.height = boss ? 55 : 25;
        enemy.color = boss ? "black" : "green";
        enemy.face = player.face;
        enemy.speed = boss ? 4 : LEVEL + 1;
        enemy.health = boss ? 800 : 500;
        enemies[emptySlot] = enemy;

        currentEnemy++;

        console.log("spawn pushed : " + enemies.length);

        enemyhb = new miniHealthBar();
        enemyhb.x = enemy.x;
        enemyhb.y = enemy.y;
        enemyhb.width = 70;
        enemyhb.height = 5;
        enemyhb.ratio = enemy.health/maxEnemyHealth;
        enemyhb.percent = enemyhb.ratio * 100;
        enemyhb.filledWidth = 70 * enemyhb.ratio;
        //enemieshb.push(enemyhb);
        enemieshb[emptySlot] = enemyhb;
        console.log("healthbar pushed : " + enemieshb.length);

        emptySlot = getEmptySlot();
    }
    else
        console.log("Spawn enemy completed");
}

function enemyMoveUpdate(enemy)
{
    if(enemy != null)
    {
        if(player.y < enemy.y)
        {
            enemy.face = "Up";
        }
        else if(player.x > enemy.x)
        {
            enemy.face = "Right";
        }
        else
        {
            enemy.face = enemy.face;
        }
        
        if(player.x <= enemy.x)
        {
            enemy.face = "Left";
        }
        else if(player.y > enemy.y)
        {
            enemy.face = "Down";
        }
        else
        {
            enemy.face = enemy.face;
        }
        targetMovementUpdate(enemy);

        //Check collision

        //for(i = 0; i < bullets.length; i++)
        //{
        //    if(bullets[i] != null && contains(enemy, bullets[i]))
        //    {
        //        enemy.health -= 15;
        //    }
        //}
    }
}

function playerMoveUpdate()
{
    if(UP)
    {
        //player.y -= speed;
        player.face = "Up";
        targetMovementUpdate(player);
    }
    else if(DOWN)
    {
        //player.y += speed;
        player.face = "Down";
        targetMovementUpdate(player);
    }
    else if(LEFT)
    {
        //player.x -= speed;
        player.face = "Left";
        targetMovementUpdate(player);
    }
    else if(RIGHT)
    {
        //player.x += speed;
        player.face = "Right";
        targetMovementUpdate(player);
    }

    //targetMovementUpdate(player);

    if(FIRE && (currentBullet < maxBullet))
    {
        //bullet = {x:player.x, y:player.y, width: 10, height: 10, color: "red", face: player.face, speed: 8, health: 50};
        
        var bullet = new EandB();
        bullet.x = player.x;
        bullet.y = player.y;
        bullet.width = 10;
        bullet.height = 10;
        bullet.color = "red";
        bullet.face = player.face;
        bullet.speed = 8;
        bullet.health = 50;
        bullets.push(bullet);

        currentBullet++;
        //console.log("Bullet face :" + bullet.face);
    }
}

// Render Loop
function onTimerTick()
{    
  // update player to mouse

  spawnEnemy();

  playerMoveUpdate();
  //enemyMoveUpdate();
  //if(enemy != null)
  //{
  //  if(enemy.health <= 0)
  //  {
  //      enemy = null;
  //  }
  //}

  for(i = 0; i < enemies.length; i++)
  {
    if(enemies[i] != null)
    {
        enemyMoveUpdate(enemies[i]);
        console.log("Enemies : "+ i + " => " +enemies[i].health);
        miniHealthBarUpdate(enemies[i], enemieshb[i]);

        if(enemies[i].health <= 0)
        {
            enemies[i] = null;
            enemieshb[i] = null;
            emptySlot = i;
            delete enemy;
            currentEnemy--;
            SCORE += 10 * (LEVEL + 1);
        }
    }
  }
  for(i = 0; i < bullets.length; i++)
  {
    if(bullets[i] != null)
    {
        bulletMoveUpdate(bullets[i]);
        if(bullets[i].health <= 0)
        {
            bullets[i] = null;
            delete bullet;
            currentBullet--;
        }
    }
  }

  for(i = 0; i < enemies.length; i++)
  {
    for(j = 0; j < bullets.length; j++)
    {
        if(contains(bullets[j], enemies[i]))
        {
            enemies[i].health -= 15;
        }
    }
  }

  //bullets.forEach(bulletMoveUpdate(blet));
  //bulletMoveUpdate();
  
  // clear the canvas
  canvas.width = canvas.width;
  
  // calculate the distance
  //var distance = distanceTo(enemy, player);
  
  // detect a collision

  var collision = false;
  for(i = 0; i < enemies.length; i++) 
  {
    collision = contains(enemies[i], player);
    player.color = collision ? "red" : "blue";
  }
  healthBarUpdate(collision ? player.health - 1 : player.health);

  //if(enemy != null)
  //{
  //  miniHealthBarUpdate(enemy, enemy.health);
  //}
  
  // draw enemy
  //context.fillStyle = "blue";
  //context.fillRect (enemy.x,enemy.y,enemy.width,enemy.height);

  //drawEnemy();
  for(i = 0; i < enemies.length; i++)
  {
    drawEnemy(enemies[i], enemieshb[i]);
  }

  // draw
  drawPlayer();

  for(i = 0; i < bullets.length; i++)
  {
    drawBullet(bullets[i]);
  }

  console.log("Done draw bullet");

  // Draw UI 
  // draw text
  //context.fillStyle = "Red";
  //context.font="18px sans-serif";
  //context.fillText("D:"+Math.round(distance), player.x + player.width, player.y + (player.height/2));
  
  // line positions
  /*
  for(i = 0; i < enemies.length; i++)
  {
    if(enemies[i] != null && player != null)
    {
        var distance = distanceTo(enemies[i], player);
        var o1cX = enemies[i].x + (enemies[i].width * .5);
        var o1cY = enemies[i].y + (enemies[i].height * .5);
        
        var o2cX = player.x + (player.width * .5);
        var o2cY = player.y + (player.height * .5);
        
        // draw distance line
        if(Math.abs(distance) > 0){
            context.beginPath();
            context.moveTo(o1cX, o1cY);
            context.lineTo(o2cX, o2cY);
            context.stroke();
        }
        
        // draw x distance line
        if(Math.abs(xd) > 0){
            context.setLineDash([5, 10]);
            context.beginPath();
            context.moveTo(o1cX, o1cY);
            context.lineTo(o2cX, o1cY);
            context.stroke();
        }
        
        // draw y distance line
        if(Math.abs(yd) > 0){
            context.setLineDash([5, 10]);
            context.beginPath();
            context.moveTo(o2cX, o1cY);
            context.lineTo(o2cX, o2cY);
            context.stroke();
        }   
    }
  }
  */

  // draw text
  context.fillStyle = "Red";
  context.font = "18px sans-serif";
  //context.fillText("Life " +player.health+"/"+maxHealth+" (" + ratio + " = " +percent +"%)", 10, 20);
  context.fillText("Level : " + (LEVEL + 1) + "    SCORE : " + SCORE, 10, 20);

  // draw background
  context.fillStyle = "black";
  context.fillRect(healthBar.x, healthBar.y, healthBar.width, healthBar.height);

  // draw fill
  context.fillStyle = "red";
  context.fillRect(healthBar.x, healthBar.y, fillWidth, healthBar.height);

  // update level using score
  if(SCORE >=  100 * (LEVEL + 1))
  {
    LEVEL++;
  }
}

// update mouse position
canvas.onmousemove = function(e) {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
}

// calculate the distance between two objects
function distanceTo( targetA, targetB) {
  if(targetA == null || targetB == null)
    return 0;

  xd = targetA.x - targetB.x;
  yd = targetA.y - targetB.y;
  
  return Math.sqrt(xd * xd + yd * yd);
}

// test for collision between two boxes
function contains(collisionBounds, target) {
    if(collisionBounds == null || target == null)
        return false;
    return (target.x + target.width >= collisionBounds.x &&
            target.x <= collisionBounds.x + collisionBounds.width &&
            target.y + target.height >= collisionBounds.y &&
            target.y <= collisionBounds.y + collisionBounds.height
           );
}

// Update health bar
function healthBarUpdate(_health)
{
    player.health = _health > 0 ? _health : 0;
    ratio = player.health/maxHealth;
    percent = ratio * 100;
    fillWidth = healthBar.width * ratio;   

    if(player.health <= 0)
    {
        gameOver();
    }
}

function miniHealthBarUpdate(enemy, enemyhb)
{
    enemy.health = enemy.health > 0 ? enemy.health : 0;
    enemyhb.ratio = enemy.health/maxEnemyHealth;
    enemyhb.percent = enemyhb.ratio * 100;
    enemyhb.filledWidth = enemyhb.width * enemyhb.ratio;   
}

// reset the canvas rotation
function resetRotateCanvas()
{
    context.rotate(0);
    context.setTransform(1, 0, 0, 1, 0, 0); 
}

function drawPlayer()
{
    drawTriangleTarget(player);
}

function drawEnemy(enemy, enemyhb)
{
    if(enemy != null)
    {
        //*
        context.fillStyle = enemy.color;
        console.log("E Color : " + enemy.color);
        context.fillRect (enemy.x,enemy.y,enemy.width,enemy.height);

        context.fillStyle = "black";
        context.fillRect(enemy.x - enemyhb.width / 3, enemy.y, enemyhb.width, enemyhb.height);
        //*/
        // draw fill
        context.fillStyle = "red";
        context.fillRect(enemy.x - enemyhb.width / 3, enemy.y, enemyhb.filledWidth, enemyhb.height);
        
        drawDiamond(enemy.x, enemy.y, enemy.width, enemy.height, enemy.color);
        console.log("Created hb");
    }
}

function drawBullet(bullet)
{
    if(bullet != null)
        drawTriangleTarget(bullet);
}

function drawTriangleTarget(target)
{
    if(target.face == FACE_DIR.UP_DIR)
        drawTriangleUp(target.x, target.y, target.width, target.height, target.color);
    else if(target.face == FACE_DIR.DOWN_DIR)
        drawTriangleDown(target.x, target.y, target.width, target.height, target.color);
    else if(target.face == FACE_DIR.LEFT_DIR)
        drawTriangleLeft(target.x, target.y, target.width, target.height, target.color);
    else if(target.face == FACE_DIR.RIGHT_DIR)
        drawTriangleRight(target.x, target.y, target.width, target.height, target.color);
}

function drawTriangleUp(x, y, width, height, color)
{
    context.beginPath();
    context.moveTo(x - (width / 2), y + (height / 2));
    context.lineTo(x, y - (height / 2));
    context.lineTo(x + (width / 2), y + (height / 2));
    context.closePath();
    context.fillStyle = color;
    context.fill();
}

function drawDiamond(x, y, width, height, color)
{
    context.beginPath();
    //Do here
    context.moveTo(x,(y+(height/2)));
    context.lineTo(x-(width/2),(y+(height/2)));
    context.lineTo(x,(y+(height/2)));
    context.lineTo(x+(width/2),(y-(height/2)));
    context.closePath();
    context.fillStyle = color;
    context.fill();
}

function drawTriangleDown(x, y, width, height, color)
{
    context.beginPath();
    context.moveTo(x + (width / 2), y - (height / 2));
    context.lineTo(x - (width / 2), y - (height / 2));
    context.lineTo(x, y + (height / 2));
    context.closePath();
    context.fillStyle = color;
    context.fill();
}

function drawTriangleLeft(x, y, width, height, color)
{
    context.beginPath();
    context.moveTo(x + (width / 2), y - (height / 2));
    context.lineTo(x - (width / 2), y);
    context.lineTo(x + (width / 2 ), y + (height / 2));
    context.closePath();
    context.fillStyle = color;
    context.fill();
}

function drawTriangleRight(x, y, width, height, color)
{
    context.beginPath();
    context.moveTo(x - (width / 2), y - (height / 2));
    context.lineTo(x + (width / 2), y);
    context.lineTo(x - (width / 2 ), y + (height / 2));
    context.closePath();
    context.fillStyle = color;
    context.fill();
}

function gameOver()
{
    window.location.replace("gameover.html?score="+SCORE);
}