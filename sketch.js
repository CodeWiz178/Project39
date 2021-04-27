var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var trex_Win
var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  trex_running =   loadAnimation("trex1.png","trex2.PNG","trex3.PNG","trex4.PNG","trex5.PNG","trex6.PNG","trex7.PNG","trex8.png","trex9.png","trex10.png");
  trex_collided = loadAnimation("trex dead.PNG");
  trex_Win = loadImage("trex1.png");
  groundImage = loadImage("Background.PNG");
  

  
  obstacle1 = loadImage("Cac1.png");
  obstacle2 = loadImage("Cac2.png");
  obstacle3 = loadImage("Cac3.png");
  obstacle4 = loadImage("cac4.png");
  obstacle5 = loadImage("cac5.png");
  obstacle6 = loadImage("cac6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("ResetBut.png");
}

function setup() {
  createCanvas(600, 200);
  
 
  
  ground = createSprite(300,-150,400,20);
  ground.addImage("ground",groundImage);
  ground.scale = 1.5
  camera.position.x = ground.x;
  camera.position.y = displayHeight/6;



  trex = createSprite(50,180,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.10

  restart = createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale = 0.15


  gameOver.visible = false;

  restart.visible = false;
  
  invisibleGround = createSprite(200,200,400,10);
  invisibleGround.visible = false;
  

  obstaclesGroup = new Group();
  

}

function draw() {
  //trex.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){

    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = trex.velocityY - 16;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);

    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }

    if(score > 100){
      restart.visible = true;
      textSize(20);
      text("We have a Winner, folks!", 225, 140);
      
  
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
   
    
    //change the trex animation
    trex.addImage("win", trex_Win);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
 
    
    if(mousePressedOver(restart)) {
      reset();
    }
    }
    
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
  
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
 
  
  
  drawSprites();
}



function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,182,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = ground.velocityX;
    
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
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();

  
  trex.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}