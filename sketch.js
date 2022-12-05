var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop, obTop1, obTop2 
var gameState = "play"

function preload(){
bgImg = loadImage("assets/bg.png")
jumpSound = loadSound("assets/jump.mp3")
dieSound = loadSound("assets/die.mp3")
balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
obTop1 = loadImage("assets/obsTop1.png")
obTop2 = loadImage("assets/obsTop2.png")
gameOverImage = loadImage("assets/gameOver.png")
restartImage = loadImage("assets/restart.png")
}

function setup(){
createCanvas(400,400)
//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3



obstaclesGroup = createGroup()

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;

gameOver = createSprite(180,200,20,20)
gameOver.addImage(gameOverImage)
gameOver.scale = 0.5


restart = createSprite(180,235,20,20)
restart.addImage(restartImage)
restart.scale = 0.5

      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;



}

function draw() {
  
  background("black");
          if(gameState === "play"){

            gameOver.visible = false

            restart.visible = false

            //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            if(!jumpSound.isPlaying()){
              jumpSound.play()
            }
           
            }
            
          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;
           spobTop()
           if(balloon.isTouching(obstaclesGroup)){
            gameState = "end"
            dieSound.play()
           }
          }
          if(gameState === "end"){
           
          
            gameOver.visible = true
            restart.visible = true
            balloon.velocityY=0
            obstaclesGroup.setVelocityXEach(0)
            obstaclesGroup.setLifetimeEach(-1)

            if(mousePressedOver(restart)){
              reset()
            }
          }
          
          balloon.collide(bottomGround)
   
        drawSprites();
       
}


function spobTop(){
  if(World.frameCount % 60 === 0){
    obstacleTop = createSprite(400,50,40,50)
   obstacleTop.scale = 0.1
    obstacleTop.velocityX = -4 
    obstacleTop.y = Math.round(random(10,100))
    obstacleTop.lifetime = 400
    obstaclesGroup.add(obstacleTop)
    var rand = Math.round(random(1,2))
    switch(rand){
      case 1 : obstacleTop.addImage(obTop1)
      break
      case 2 : obstacleTop.addImage(obTop2)
      break
      default: 
      break
    }
  }
}

function reset(){
  gameState = "play"
  obstaclesGroup.destroyEach()
}