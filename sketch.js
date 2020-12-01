var database;
var dog, happyDog, dogImg, happyDogImg;
var foodS, foodStock;

function preload(){
  dogImg = loadImage("Dog.png");
  happyDogImg = loadImage("happydog.png");
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();

  dog = createSprite(250,250);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  

  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  textSize(20);
  stroke(10);
  text("Food Stock : "+ foodS,180,450);

  text("Press Up Arrow To Feed Drago",120,100)
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
 
if(x>0){
  x = x-1;
}else{
   x = 20
 }

 
  database.ref('/').update({
    Food:x
  })
}