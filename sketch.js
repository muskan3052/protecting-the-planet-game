const World = Matter.World;
const Engine = Matter.Engine;
const Body = Matter.Body;
const Bodies = Matter.Bodies;

var bg, bgImage;
var engine, world;
var canvas;
var lives = 3;
var score = 0;
var bullet, bulletGroup;
var hearts=[]

function preload() {
    //load the images here
   bgImage=loadImage("images/space.jpg")
   heartImage=loadImage("images/heart.png");
   bulletImage=loadImage("images/bullet.png")
   boomSound = loadSound("boom.mp3")
}

function setup(){
    canvas = createCanvas(1000,800);
    engine=Engine.create();
    world=engine.world;
    bg = createSprite(width/2, height/2);
    bg.addImage("bg", bgImage);
    bg.scale=1

    heart1 = createSprite(width-225, height-725, 20, 20)
    heart1.addImage("heart1",heartImage);
    heart1.scale=.2;
    
    heart2 = createSprite(width-150, height-725, 20, 20)
    heart2.addImage("heart2",heartImage);
    heart2.scale=.2;

    heart3 = createSprite(width-75, height-725, 20, 20)
    heart3.addImage("heart3",heartImage);
    heart3.scale=.2;
    hearts=[heart1,heart2,heart3]

    bulletGroup=createGroup();

    planet = new Earth ()
    asteroid = new Asteroid ();
    plane = new Plane();
    dinosaur = new Dinosaur(990,790)

}

function draw() {

    background("black");

    Engine.update(engine);

    if(keyDown("space")){
        shootBullet();
    }

    if(asteroid.asteroidGroup.collide(bulletGroup)){
        score=score+20;
        asteroid.asteroidGroup.destroyEach();
        bulletGroup.destroyEach();
    }

//     for(var i = 0; i < hearts.length;i ++){
//     if(asteroid.asteroidGroup.collide(planet.planet)){
//         hearts[i].visible=false;
//         asteroid.asteroidGroup.destroyEach();
//     }
// }

if(asteroid.asteroidGroup.isTouching(planet.planet)){
    console.log(hearts)
    boomSound.play();
   
    asteroid.asteroidGroup.destroyEach();
    hearts[hearts.length-1].destroy()
    hearts.pop()
    
}

if(hearts.length==0){
    gameOver();
}

    drawSprites();

    textSize(25);
    text("score : " + score, width-200, height-650)

    planet.display();
    asteroid.display();
    plane.display();
    dinosaur.display();
    plane.handlePlaneMovement();

    
}

function shootBullet(){
    bullet= createSprite(500, 450, 50,20)
    bullet.x=plane.x
    bullet.addImage(bulletImage)
    bullet.scale=0.12
    bullet.velocityY= -7
    bulletGroup.add(bullet);
  }

  function gameOver() {
    swal({
      title: `Game Over!`,
      text: "Oops, you lost the game....!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Play Again!"
    },
    
    function (isConfirm) { 
    if (isConfirm) 
    { location.reload(); } })
  }

