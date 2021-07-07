var mario, mario_running, mario_collided;
var ground, invisibleGround, groundImage;

var brickGroup, brickImage
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;

var score;

function preload(){
    mario_running = loadAnimation("mario00.png", "mario01.png", "mario02.png");
    mario_collided - loadImage("mario03.png");

    groundImage = loadImage("ground2.png");

    brickImage = loadImage("brick.png")

    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
}

function setup(){
    createCanvas(600, 200);

    mario = createSprite(200, 180, 20, 50)
    mario.addAnimation("running", mario_running);
    mario.scale = 0.5;

    ground = createSprite(200, 180, 400, 20);
    ground.addImage("ground", groundImage);
    ground.x = ground.width/2;
    ground.velocityX = -4;

    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;

    brickGroup = new Group();
    obstaclesGroup = new Group();
    
    score = 0;
}

function draw() {
    background(180);
    
    score = score + Math.round(getFrameRate()/60);
    text("Score: "+ score, 500,50);
    
    if(keyDown("space")) {
      mario.velocityY = -10;
    }
    
    mario.velocityY = mario.velocityY + 0.8
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    mario.collide(invisibleGround);
    spawnBrick();
    spawnObstacles();
    drawSprites();
  }

  function spawnBrick() {
    //write code here to spawn the brick
    if (frameCount % 60 === 0) {
      var brick = createSprite(600,120,40,10);
      brick.y = Math.round(random(80,120));
      brick.addImage(brickImage);
      brick.scale = 0.5;
      brick.velocityX = -3;
      
       //assign lifetime to the variable
      brick.lifetime = 200;
      
      //adjust the depth
      brick.depth = mario.depth;
      mario.depth = mario.depth + 1;
      
      //add each brick to the group
      brickGroup.add(brick);
    }
    
  }

  function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(600,165,10,40);
      obstacle.velocityX = -4;
      
      //generate random obstacles
      var rand = Math.round(random(1,6));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;
        case 4: obstacle.addImage(obstacle4);
                break;
      }
      
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.5;
      obstacle.lifetime = 300;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
    }
  }