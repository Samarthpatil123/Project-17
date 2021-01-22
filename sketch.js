var tower,towerImage;
var door , doorImage, doorsGroup;
var climber,climberImage,climbersGroup;
var invisibleBlock,invisibleBlocksGroup;
var ghost,ghostImage;
var gameState="PLAY"

function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=1;

  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.4;
  
 doorsGroup=new Group() 
  invisibleBlocksGroup=new Group()
  climbersGroup=new Group()
}


function draw(){
  background(0);
  if(gameState==="PLAY"){
  if(tower.y>400){
  tower.y=300   
     }
  if(keyDown('space')){
    ghost.velocityY=-5; 
  }
  if(keyDown('left')){
    ghost.x=ghost.x-3; 
  }
  if(keyDown('right')){
    ghost.x=ghost.x+3; 
  }
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleBlocksGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="END"
  }
  
  ghost.velocityY=ghost.velocityY+0.8;
  spawnDoors();
  drawSprites();
  
}
  if(gameState==="END"){
    stroke("yellow");
    fill("yellow"); 
    textSize(30); 
    text("Game Over", 230,250)
  }
}

function spawnDoors(){
  if(frameCount%240===0){
    door=createSprite(200,-50);
    door.velocityY=1;
    door.addImage(doorImage);
    door.lifetime=800;
    ghost.depth=door.depth
    ghost.depth+=1;
    door.x=Math.round(random(120,400));
    doorsGroup.add(door);
    climber=createSprite(200,10);
    climber.velocityY=1;
    climber.addImage(climberImage);
    climber.lifetime=800;
    climber.x=door.x;
    climbersGroup.add(climber);
    invisibleBlock=createSprite(200,10);
    invisibleBlock.velocityY=1;
    invisibleBlock.lifetime=800;
    invisibleBlock.x=door.x;
    invisibleBlock.height=2
    invisibleBlock.width=climber.width;
    invisibleBlocksGroup.add(invisibleBlock);
  }
}