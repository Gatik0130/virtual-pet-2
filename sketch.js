//Create variables here



var dog 
var happydog 
var database
var foodS
var foodStock
var foodObject
var fedTime,lastFed
var feed
var addFood


function preload()
{
  dogImage = loadImage("images/dogImg.png")
  happydogImage= loadImage("images/dogImg1.png")
	//load images here
}

function setup() {
	createCanvas(500, 500);
  
  foodObject=new Food()

  feed= createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood= createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  
  dog= createSprite(250,250,20,20);
  dog.addImage(dogImage)
  dog.scale=0.3

  database=firebase.database()

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87)

  dog.display();

 foodObject.display();
 
 fedTime=database.ref("FeedTime");
 fedTime.on("value",function(data){
  lastFed=data.val();
 }) 
  
 
 
 //add styles here
  textSize(20)
  fill("red")
  text ("foodStock",100,100)
  
  stroke(1)

  fill(255,255,255);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed :" + lastFed%12 + "PM",350,30 );
  }
  else if (lastFed==0){
    text("Last Feed : 12 AM",350,30 );
  } else {
    text("Last Feed :" + "AM",350,30);
  } 


  drawSprites();

}

function readStock(data){
  foodS=data.val();
 foodObject.updateFoodStock(foodS);
}



function addFoods(){

   foodS++
   database.ref("/").update({
     Food: foodS
   })



}

function feedDog(){
  dog.addImage(happydogImage);

  foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  database.ref("/").update({
    Food:foodObject.getFoodStock(),
    FeedTime:hour()
  })
}

