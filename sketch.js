var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}
function setup() {
  createCanvas(600, 400);
  
  stroke('black');
  textSize(20);
  fill('black')
  text('score: ' + survivalTime, 500, 50)
  survivalTime=Math.ceil(frameCount/frameRate())
  

  //create monkey sprite
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.12 ;

  //create ground sprite 
  ground = createSprite(400, 350, 1200, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  //ground.debug=true

  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() {
  background('white')

  //to make the monkey jump when space key pressed
  if (keyDown("space")) {
    monkey.velocityY = -12;
  }

  //gravity
  monkey.velocityY = monkey.velocityY + 0.8

  //to reapper the ground when it crosses half its width
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  //to collide the monkey with the ground
  monkey.collide(ground);

  spawnBananas();
  spawnObstacles();
  drawSprites();
  
  stroke('black');
  textSize(20);
  fill('black')
  text('score: ' + survivalTime, 500, 50)
  survivalTime=Math.ceil(frameCount/frameRate())
}

function spawnBananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(590, 300, 20, 20)
    banana.addImage(bananaImage)
    banana.y = Math.round(random(120, 200))
    banana.scale = 0.1
    banana.velocityX = -12
    bananaGroup.add(banana)
  }
}
function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(400, 350, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = -1;
    obstacle.velocityX = -8;
    obstacle.collide(ground);
    //obstacle.debug=true
    obstacleGroup.add(obstacle);
  }

}