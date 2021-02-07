var database;
var dog;
var foodS;
var Milk;
var LastFed;
var FedTime;

function preload(){
    dogimg=loadImage("aDog.png");
    happydogimg=loadImage("happydog.png");

}

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    dog = createSprite (300,300,30,40);
    dog.addImage(dogimg);
    dog.scale = 0.2

    addfoodbutton = createButton ("Add Food");
    addfoodbutton.position(600,150);
    addfoodbutton.mousePressed(addFood);

    feedfoodbutton = createButton ("Feed Food");
    feedfoodbutton.position(400,150);
    feedfoodbutton.mousePressed(feedFood);
    
    foodStock=database.ref('Food');
    foodStock.on("value",readStock);

    Milk=new Food();

}

function draw(){
    background("grey");


    if(keyWentDown(UP_ARROW)){
        dog.addImage(happydogimg);
        writeStock(foodS);
    }
    
    FedTime = database.ref("FeedTime");
    FedTime.on ("value", function (data){
        LastFed = data.val();
    })

    Milk.display();
    drawSprites();
    fill("red");
    text ("food:"+foodS,200,50);
    if(LastFed>=12){
        text("Last Feed : "+ LastFed%12+"PM", 350,30);
    }else if (LastFed==0){
        text("Last Feed : 12 AM",350,30);
    }else{
        text("Last Fed : "+ LastFed + "AM", 350, 30);

 }
}


function readStock(data){
    foodS=data.val();
}

function writeStock(x){

    if(x<=0){
        x=0;
    }else{
        x=x-1
    }

database.ref('/').update({
    Food:x
})
}

function feedFood(){
    dog.addImage(happydogimg);
    foodS=foodS-1
    database.ref('/').update({
        FeedTime:hour(),
        Food:foodS
    })
}

function addFood(){
    foodS=foodS+1
    database.ref('/').update({
        Food:foodS
    })
}