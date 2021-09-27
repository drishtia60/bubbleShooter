var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  heading = createElement("h1");
  scoreboard = createElement("h1");

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes
  scoreboard.html("Score:"+score)
  scoreboard.style('color:red')
  scoreboard.position(width-200,20);

  if(gameState===1){
    gun.y=mouseY 
    
    if(keyDown("space")){
      shootBullet();}

      if(frameCount%80===0){
        drawblueB();
    }
    if(frameCount%100 === 0){
       drawredB();
    }
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);

    }
    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }
    if(blueBubbleGroup.collide(backBoard)){
      handleGameOver(blueBubbleGroup);

    }
    if(redBubbleGroup.collide(backBoard)){
     handleGameOver(redBubbleGroup);

   }
    
    drawSprites();
  }
     
}

function shootBullet(){
 var bullet = createSprite(100,400);
 bullet.y = gun.y-35;
 bullet.velocityX = 10;
 bullet.addImage(bulletImg);
 bullet.scale = 0.15;
 bullet.depth = gun.depth - 1;
 bullet.depth = blueBubbleGroup.depth + 1
 bullet.depth = redBubbleGroup.depth + 1
 bullet.lifetime = 180;
 bulletGroup.add(bullet);
}

function drawblueB(){
  
    var blueB = createSprite(750,random(20,780),40,40);
    blueB.velocityX = -4;
    blueB.scale = 0.1;
    blueB.addImage(blueBubbleImg);
    blueB.lifetime = 400;
    blueBubbleGroup.add(blueB);
  
}

function drawredB(){
  if(frameCount % 100 === 0){
    var redB = createSprite(750,random(20,780),40,40);
    redB.velocityX = -5;
    redB.scale = 0.15;
    redB.addImage(redBubbleImg);
    redB.lifetime = 400;
    redBubbleGroup.add(redB);
  }
}

function handleBubbleCollision(bubbleGroup){
  if (life > 0) {
    score=score+1;
 }

 blast= createSprite(bullet.x+60, bullet.y, 50,50);
 blast.addImage(blastImg)
 blast.scale=0.3
 blast.life=20
 bulletGroup.destroyEach();
 bubbleGroup.destroyEach();
}
function handleGameOver(bubbleGroup){

  life = life - 1
  bubbleGroup.destroyEach();

  if(life===0){
    gameState = 2
    swal({
      title:`GameOver!`,
      text: "Opps you lost the game...!!",
      text:"Your Scaor is "+score,
      imageUrl:
      "https://cdn.shopify.com/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize:"100x100",
      confirmButtonText: "Thanks For Playing"

    });
  }

}


