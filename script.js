var player
var snakes
var snake
var snakeimg
var birdimg
var birds
var hopVel = -7
var g = .3
var game_state = false
var myRec = new p5.SpeechRec();
myRec.continuous = true;


function setup() {
    createCanvas(1100, 500)
    player = createSprite(100, 400, 20, 20)
    var rabbitimg = loadImage("rabbit.png")
    player.addImage(rabbitimg)
    snakeimg = loadImage("snake.png")
    snakes = new Group()
    // snake = createSprite(200,450,91, 100)
    // snake.addImage(snakeimg)
    birdimg = loadImage("bird2.png")
    birds = new Group()
    myRec.onResult = check
    myRec.start()
}



function draw() {
    clear()
    background(155)
    if (game_state) {
        if (frameCount % 60 == 0) {
            var snakeH = Math.floor((Math.random() * 200) + 300)
            var newsnake = createSprite(player.position.x + width, snakeH, 91, 100);
            newsnake.addImage(snakeimg);
            newsnake.setVelocity(-5, 0)
            // console.log(newsnake)
            snakes.add(newsnake);

            var birdH = Math.floor(Math.random() * 200)
            var newbird = createSprite(player.position.x + width + 100, birdH, 100, 57);
            newbird.addImage(birdimg);
            newbird.setVelocity(-5, 0)
            // console.log(newsnake)
            birds.add(newbird);
        }
        
        if (player.position.y > 500) {
            lose()
        }
        else{
            player.velocity.y += g
        }
        if(snakes.length>0){
            if(snakes[0].position.x < 0){
                snakes[0].remove()
            }
        }
        if(birds.length>0){
            if(birds[0].position.x < 0){
                birds[0].remove()
            }
        }
        player.overlap(birds,lose)
        player.overlap(snakes,lose)
        
    }
    drawSprites()
}

function keyPressed() {
    
    if (keyCode == UP_ARROW) {
        if(game_state){
            doHop()
        }
    }
    if(keyCode == 32){
        if(!game_state){
        game_state = true
        }
    }
}


function doHop() {
    player.velocity.y = hopVel
}

function lose() {
    game_state = false
    player.velocity.y = 0
    player.position.y = 400
    console.log(snakes.length)
    while(snakes.length!=0) {
        snakes[0].remove()
    }
    while(birds.length!=0) {
        birds[0].remove()
    }
}

function check(){
    console.log("here")
    console.log(myRec.resultString)
    if(myRec.resultString == "hop"){
        doHop()
    }
}