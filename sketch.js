var balloon, background, database, position;
var balloonImg, backgroundImg;



function preload(){
    backgroundImg = loadImage("images/1.png");
    balloonImg = loadAnimation("images/2.png","images/3.png","images/4.png");
}

function setup(){
    database = firebase.database();

    createCanvas(500,500);

    balloon = createSprite(300,400,20,20);
    balloon.addAnimation("balloon", balloonImg);
    balloon.scale = 0.4;

    var balloonPosition = database.ref('balloon/position');
    balloonPosition.on("value",readPosition,showError);
}

function draw(){
    background(backgroundImg);

    if (position !== undefined) {
        if(keyDown(LEFT_ARROW)){
            writePosition(-2.5,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(2.5,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-2.5);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+2.5);
        }
        drawSprites();
    }
}


function writePosition(x,y){
   database.ref('balloon/position').set({
       'x': position.x + x, 
       'y': position.y + y
   })
}


function readPosition(data) {
    position = data.val()
    balloon.x = position.x
    balloon.y = position.y
}


function showError() {
    console.log("Error in writing to the database")
}

