//Create variables here
var dog, happyDog, database, foodS, foodStock,cdogImg, dogImg2;
var addFood, feed, feedTime, lastFed, foodObj, gameState, readState;
var bedroom,garden,washroom;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
  bedroom = loadImage("images2/bedroom.png");
  garden = loadImage("images2/garden.png");
  washroom = loadImage("images2/washroom.png");

  
}

function setup() {
	createCanvas(1000, 600);
  database = firebase.database();
  console.log(database);

  foodObj = new Food();
  foodStock = database.ref('Food').on('value',readStock);

  dog = createSprite(750,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  
  feed = createButton("Feed the dog");
  feed.position(1200,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(1100, 95);
  addFood.mousePressed(addFoods);

  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState = data.val();
  });

}


function draw() {  
  background(46,139,87);
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  currentTime = hour();
  if (currentTime === (lastFed + 1)){
    update("Playing");
    foodObj.garden();
  } else if(currentTime === (lastFed + 2)){
      update("sleeping");
      foodObj.bedroom();
  } else if (currentTime > (lastFed +2) && currentTime <= (lastFed + 4)){
      update("Bathing");
      foodObj.washroom();
  } else {
      update("Hungry");
      foodObj.display();
  }
  
  textSize(20);
  stroke("white");
  fill("blue");
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + "PM", 390, 30);
  }else if(lastFed==0){
    text("Last Fed : 12 AM", 390, 30);
  }else{
    text("Last Fed : "+lastFed, 390, 30);
  }

  //add styles here
  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  if(x<=0){
    x = 0
  }else{
    x = x-1;
  }

  database.ref('/').update({
    Food: x
  })

}
function feedDog(){

  dog.addImage(dogImg2);
  foodS--;
  database.ref('/').update({
    Food: foodS,
    FeedTime: hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function update(state){
  database.ref('/').update({
    gameState:state
  });
}



