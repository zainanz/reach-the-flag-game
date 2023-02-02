/*

- Copy your game project code into this file
- for the p5.Sound library look here https://p5js.org/reference/#/libraries/p5.sound
- for finding cool sounds perhaps look here
https://freesound.org/


*/

/*

The Game Project 7

*/


var jumpSound;

function preload()
{
    soundFormats('mp3','wav');
    
    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.005);
    backgroundSound = loadSound('assets/background.wav');
    backgroundSound.setVolume(0.07);
    //walkingSound = loadSound('assets/walking.wav'); # decided to not use it, its quite noisdy and annoying.
    victorySound = loadSound('assets/victory.mp3')
    victorySound.setVolume(0.02);
}


var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isJumping;
var isPlummeting;
var CameraPosX;
var canyonfall;
var score;
var gameState; // 0 = working game, 1 = win, 2 = game over.
var lives;
var arrowFall;
//objects
var canyons;
var collectables;
var clouds;
var mountains;
var flagpole;

var treePos_x; //array
var treePos_y;

function setup()
{
    
	createCanvas(1024, 576);
    floorPos_y = height * 3/4;
    lives = 3;
    startGame();
    backgroundSound.play();
    a = new createEnemies(4);
}
    
function draw()
{

	///////////DRAWING CODE//////////
	background(100,155,255); //Blue Sky
    textSize(30);
    
    //Ground
    push();
    noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, width, height - floorPos_y);
    pop();
    
    //Implementing SideScrolling
    push();
    translate(-CameraPosX, 0);
    //Mountain behind everything except clouds.
    drawMountains();
    
    //cloud
    drawClouds();
    
    // tree here
    drawTrees();
    
    //drawCanyon draws and calls another function called checkCanyons.
    drawCanyon(canyons); 
    renderFlagpole();
    // The function >> drawCollectables also calls another function checkCollectables. 
    drawCollectable(collectables);
    a.spawnEnemies();
    //the game character
	if(isLeft && isJumping)
	{
		//jumping-left code
        fill(255, 220, 150);
        ellipse(gameChar_x, gameChar_y-50, 15, 20);rect(gameChar_x-4, gameChar_y-41, 6,3); //head and neck
        strokeWeight(0.5);stroke(0);
        beginShape();
        vertex(gameChar_x+5,gameChar_y-17);vertex(gameChar_x+9,gameChar_y+1);vertex(gameChar_x+4,gameChar_y+1);vertex(gameChar_x-3,gameChar_y-12);
        endShape();
        beginShape();
        vertex(gameChar_x-4,gameChar_y-17);vertex(gameChar_x-13,gameChar_y+1);vertex(gameChar_x-7,gameChar_y+1);vertex(gameChar_x+3,gameChar_y-12);
        endShape();

        fill(255,0,0);
        rect(gameChar_x-8, gameChar_y-37, 15, 20);
        fill(0,0,255);strokeWeight(0.5);stroke(0);rect(gameChar_x-8,gameChar_y-17,10,5);strokeWeight(0);rect(gameChar_x-0.5,gameChar_y-17,7.5,5);fill(167,114,28);strokeWeight(1);ellipse(gameChar_x,gameChar_y-60,13,13); rect(gameChar_x-13,gameChar_y-57, 25,5);//clothing
        fill(255,220,150);
        strokeWeight(0.5);
        beginShape();
        vertex(gameChar_x-3,gameChar_y-31);vertex(gameChar_x-19,gameChar_y-45);vertex(gameChar_x-16,gameChar_y-49);vertex(gameChar_x+6,gameChar_y-31);
        endShape();

	}
	else if(isRight && isJumping)
	{
		//jumping-right code
        fill(255, 220, 150);
        ellipse(gameChar_x, gameChar_y-50, 15, 20);rect(gameChar_x-4, gameChar_y-41, 6,3); //head and neck
        strokeWeight(0.5);stroke(0);
        beginShape();
        vertex(gameChar_x-6,gameChar_y-17);vertex(gameChar_x-10,gameChar_y+1);vertex(gameChar_x-5,gameChar_y+1);vertex(gameChar_x+2,gameChar_y-12);
        endShape();
        beginShape();
        vertex(gameChar_x+4,gameChar_y-17);vertex(gameChar_x+13,gameChar_y+1);vertex(gameChar_x+7,gameChar_y+1);vertex(gameChar_x-3.5,gameChar_y-12);
        endShape();
        fill(255,0,0);
        rect(gameChar_x-8, gameChar_y-37, 15, 20);
        fill(0,0,255);strokeWeight(0.5);stroke(0);rect(gameChar_x-3,gameChar_y-17,10,5);strokeWeight(0);rect(gameChar_x-8,gameChar_y-17,7.5,5);
        fill(167,114,28);strokeWeight(1);ellipse(gameChar_x,gameChar_y-60,13,13); rect(gameChar_x-13,gameChar_y-57, 25,5);//clothing
        fill(255,220,150);
        strokeWeight(0.5);
        beginShape();
        vertex(gameChar_x+3,gameChar_y-31);vertex(gameChar_x+19,gameChar_y-45);vertex(gameChar_x+16,gameChar_y-49);vertex(gameChar_x-6,gameChar_y-31);
        endShape();

	}
	else if(isLeft)
	{
		//walking left code
        fill(255, 220, 150);
        ellipse(gameChar_x, gameChar_y-50, 15, 20);rect(gameChar_x-4, gameChar_y-41, 6,3); //head and neck
        strokeWeight(0.5);stroke(0);
        beginShape();
        vertex(gameChar_x+5,gameChar_y-17);vertex(gameChar_x+9,gameChar_y+1);vertex(gameChar_x+4,gameChar_y+1);vertex(gameChar_x-3,gameChar_y-12);
        endShape();
        beginShape();
        vertex(gameChar_x-4,gameChar_y-17);vertex(gameChar_x-13,gameChar_y+1);vertex(gameChar_x-7,gameChar_y+1);vertex(gameChar_x+3,gameChar_y-12);
        endShape();

        fill(255,0,0);
        rect(gameChar_x-8, gameChar_y-37, 15, 20);
        fill(0,0,255);strokeWeight(0.5);stroke(0);rect(gameChar_x-8,gameChar_y-17,10,5);strokeWeight(0);rect(gameChar_x-0.5,gameChar_y-17,7.5,5);fill(167,114,28);strokeWeight(1);ellipse(gameChar_x,gameChar_y-60,13,13); rect(gameChar_x-13,gameChar_y-57, 25,5);//clothing
        fill(255,220,150);
        strokeWeight(0.5);
         beginShape();
        vertex(gameChar_x-5,gameChar_y-31);vertex(gameChar_x-21,gameChar_y-17);vertex(gameChar_x-15,gameChar_y-17);vertex(gameChar_x+4,gameChar_y-31);
        endShape();

	}
	else if(isRight)
	{
		//walking right code
        fill(255, 220, 150);
        ellipse(gameChar_x, gameChar_y-50, 15, 20);rect(gameChar_x-4, gameChar_y-41, 6,3); //head and neck
        strokeWeight(0.5);stroke(0);
        beginShape();
        vertex(gameChar_x-6,gameChar_y-17);vertex(gameChar_x-10,gameChar_y+1);vertex(gameChar_x-5,gameChar_y+1);vertex(gameChar_x+2,gameChar_y-12);
        endShape();
        beginShape();
        vertex(gameChar_x+4,gameChar_y-17);vertex(gameChar_x+13,gameChar_y+1);vertex(gameChar_x+7,gameChar_y+1);vertex(gameChar_x-3.5,gameChar_y-12);
        endShape();
        fill(255,0,0);
        rect(gameChar_x-8, gameChar_y-37, 15, 20);
        fill(0,0,255);strokeWeight(0.5);stroke(0);rect(gameChar_x-3,gameChar_y-17,10,5);strokeWeight(0);rect(gameChar_x-8,gameChar_y-17,7.5,5);
        fill(167,114,28);strokeWeight(1);ellipse(gameChar_x,gameChar_y-60,13,13); rect(gameChar_x-13,gameChar_y-57, 25,5);//clothing
        fill(255,220,150);
        strokeWeight(0.5);
        beginShape();
        vertex(gameChar_x+5,gameChar_y-31);vertex(gameChar_x+21,gameChar_y-17);vertex(gameChar_x+15,gameChar_y-17);vertex(gameChar_x-4,gameChar_y-31);
        endShape();


	}
	else if(isJumping || isPlummeting)
	{
		//jumping facing forwards code
        fill(255, 220, 150);strokeWeight(0);
        ellipse(gameChar_x, gameChar_y-50, 20, 20);rect(gameChar_x-4, gameChar_y-41, 8,5);
        //arm left
        strokeWeight(0.5);
        stroke(1);
        beginShape();
        vertex(gameChar_x-12,gameChar_y-37);vertex(gameChar_x-14,gameChar_y-52);vertex(gameChar_x-19,gameChar_y-51);vertex(gameChar_x-16,gameChar_y-32);vertex(gameChar_x-12,gameChar_y-32); //arm left
        endShape();
        //arm right
        beginShape();
        vertex(gameChar_x+12,gameChar_y-37);vertex(gameChar_x+14,gameChar_y-52);vertex(gameChar_x+19,gameChar_y-51);vertex(gameChar_x+16,gameChar_y-32);vertex(gameChar_x+12,gameChar_y-32);
        endShape();
        //leg left
        beginShape();
        vertex(gameChar_x-8,gameChar_y-12);vertex(gameChar_x-12,gameChar_y+2);vertex(gameChar_x-8,gameChar_y+2);vertex(gameChar_x-1.5,gameChar_y-12);
        endShape();
        //right leg
        beginShape();vertex(gameChar_x+8,gameChar_y-12);vertex(gameChar_x+12,gameChar_y+2);vertex(gameChar_x+8,gameChar_y+2);vertex(gameChar_x+1.5,gameChar_y-12);
        endShape();
        //t-shirt
        strokeWeight(0);
        fill(255,0,0);
        rect(gameChar_x-8, gameChar_y-37, 15, 20);
        rect(gameChar_x-8,gameChar_y-37, -5,5);
        rect(gameChar_x+7,gameChar_y-37, 5,5);
        //shorts
        fill(0,0,255);strokeWeight(0.5);stroke(0);rect(gameChar_x-8,gameChar_y-17,7.5,5);rect(gameChar_x-0.5,gameChar_y-17,7.5,5);
        // strawhat
        fill(167,114,28);;
        ellipse(gameChar_x,gameChar_y-65,13,13);
        rect(gameChar_x-13,gameChar_y-62, 25,5); 

	}
	else
	{
		fill(255, 220, 150);strokeWeight(0);  
        ellipse(gameChar_x, gameChar_y-50, 20, 20);rect(gameChar_x-4, gameChar_y-41, 8,5);strokeWeight(0.5);stroke(1);rect(gameChar_x-13,gameChar_y-33, 5,15);rect(gameChar_x+7,gameChar_y-33, 5,15);rect(gameChar_x-7,gameChar_y-12,5,15);rect(gameChar_x,gameChar_y-12,5,15);//skin
        fill(255,0,0);strokeWeight(0);
        rect(gameChar_x-8, gameChar_y-37, 15, 20);rect(gameChar_x-8,gameChar_y-37, -5,5);rect(gameChar_x+7,gameChar_y-37, 5,5);
        fill(0,0,255);strokeWeight(0.5);stroke(0);rect(gameChar_x-8,gameChar_y-17,7.5,5);rect(gameChar_x-0.5,gameChar_y-17,7.5,5);fill(167,114,28);;ellipse(gameChar_x,gameChar_y-65,13,13); rect(gameChar_x-13,gameChar_y-62, 25,5);//clothing
	}
    //arrowFall.update();
    pop(); // End of SideScrolling
    //SCORE Counter
    fill(0);
    text("SCORE: " + score, 10, 30);
	///////////INTERACTION CODE//////////
    console.log(gameChar_y-floorPos_y);
    if(isJumping){ 
        gameChar_y = floorPos_y - 100;
    }
    if(isRight){
//        if()
        if(gameChar_x > width/2)
            {
                CameraPosX +=4;
                console.log('Following at ' + CameraPosX + gameChar_x);
            }
        gameChar_x += 4;
        
    }
    if(isLeft){
        if(gameChar_x > 2)
            {
                gameChar_x -= 4;
                if(gameChar_x > width/2)
                    {
                        CameraPosX -= 4;                
                    }
            }

    }
    
    if(isPlummeting){
        if(canyonfall == true){
            isLeft = false;
            isRight = false;
            gameChar_y += 8;
        }else if(gameChar_y < floorPos_y){ // condition is used to prevent player from falling thru the ground. 
            gameChar_y += 2;
        }
    }
    if(lives <= 0)
        {
            gameOver();
        }
    checkPlayerDie();
    showLives();
    checkWin();
}


    
function keyPressed()
{
    // right arrow ley
    if(keyCode == 39 || keyCode == 68 && canyonfall == false && gameState == 0){
        isRight = true;
    }
    //left arrow key
    if(keyCode == 37 || keyCode == 65 && canyonfall == false && gameState == 0){
        isLeft = true;
    }
    if((keyCode == 38|| keyCode == 87) && gameChar_y >= floorPos_y && gameState == 0){ //Checks for two conditions. Second condition is used to restrict double jump.
        if(!canyonfall){
            jumpSound.play();
            gameChar_y = floorPos_y - 100; // if player is not inside a canyon, he will be allowed jump. 
        }
        isPlummeting = true // time to get back to earth
    }
    if(keyCode == 32 && gameState == 2){
        lives = 3;
        startGame();
    }
	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
}

function keyReleased()
{
	//Right arrow KEY/ D
    if(keyCode == 39 || keyCode == 68){
        isRight = false;
    }
    //left arrow key or KEY A
    if(keyCode == 37 || keyCode == 65){
        isLeft = false;
    }
	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
}

// draw functions
function drawClouds()
{
    for(var i = 0; i < clouds.length; i++){
        push();
        fill(255);noStroke();
        ellipse(clouds[i].x_pos + clouds[i].scale/100, clouds[i].y_pos + clouds[i].scale/100, clouds[i].scale, clouds[i].scale);
        ellipse(clouds[i].x_pos-50 *clouds[i].scale/100, clouds[i].y_pos + clouds[i].scale/100, clouds[i].scale, clouds[i].scale);
        ellipse(clouds[i].x_pos-25 * clouds[i].scale/100, clouds[i].y_pos-30 * -clouds[i].scale/100, clouds[i].scale, clouds[i].scale);
        ellipse(clouds[i].x_pos+50 * clouds[i].scale/100, clouds[i].y_pos + clouds[i].scale/100, clouds[i].scale, clouds[i].scale);
        ellipse(clouds[i].x_pos+25 * clouds[i].scale/100, clouds[i].y_pos-30 * -clouds[i].scale/100, clouds[i].scale, clouds[i].scale);    
        pop();
    }
}
function drawTrees()
{
    for(var i=0;i < treePos_x.length; i++){
        push();
        noStroke();
        fill(115, 56, 5);
        rect(treePos_x[i], treePos_y, 50, 148);
        fill(01, 113, 14);   
        triangle(treePos_x[i]+25,treePos_y-70, treePos_x[i]-35,treePos_y+20,treePos_x[i]+85, treePos_y+20);
        triangle(treePos_x[i]+25, treePos_y-120, treePos_x[i]-35,treePos_y-10,treePos_x[i]+85,treePos_y-10);
        ellipse(treePos_x[i]+65,treePos_y-5,30,30);
        ellipse(treePos_x[i]-15,treePos_y-5,30,30);
        pop();
    }
       
}
function drawMountains()
{
    for(var i= 0;i < mountains.length; i++){
        push();
        fill(100);
        noStroke();
        beginShape();
        vertex(mountains[i].x_pos,floorPos_y);
        vertex(mountains[i].x_pos+130*mountains[i].scale,floorPos_y);
        vertex(mountains[i].x_pos + 86*mountains[i].scale,floorPos_y-84* mountains[i].scale);
        vertex(mountains[i].x_pos+59*mountains[i].scale,floorPos_y- 93*mountains[i].scale);
        vertex(mountains[i].x_pos+16*mountains[i].scale,floorPos_y- 38 * mountains[i].scale);
        endShape(); 
        pop();
    }  
}
function drawCollectable(t_collectable)
{
    for(var i = 0; i < collectables.length; i++){
        if(t_collectable[i].isFound == false)
        {
                push();
                fill(205,133,63);
                arc(t_collectable[i].x_pos,t_collectable[i].y_pos, t_collectable[i].size/2.5,t_collectable[i].size/1.75, PI, radians(360));
                fill(255,0,0);
                ellipse(t_collectable[i].x_pos,t_collectable[i].y_pos-1*t_collectable[i].size/100,t_collectable[i].size/1.5,t_collectable[i].size/10);
                pop();
        checkCollectables(t_collectable[i]); //detects if the player is in the range of a collectable.
        }  
    }
        
}
    
function drawCanyon(t_canyon)
{
    for(var i =0; i < t_canyon.x_pos.length; i++){
        
        push();
        fill(92, 64, 51);
        noStroke();
        rect(t_canyon.x_pos[i], floorPos_y, t_canyon.width[i]*1, 100);
        rect(t_canyon.x_pos[i]-20*t_canyon.width[i]/100, floorPos_y+58, t_canyon.width[i]*1.40, 100);
        stroke(100,50,230);
        fill(100,50,230);
        rect(t_canyon.x_pos[i]+25*t_canyon.width[i]/100, floorPos_y, t_canyon.width[i]*0.5, t_canyon.width[i]);
        ellipse(t_canyon.x_pos[i]+50*t_canyon.width[i]/100, floorPos_y+t_canyon.width[i], t_canyon.width[i]/2, t_canyon.width[i]);
        fill(255,0,0);
        ellipse(t_canyon.x_pos[i], floorPos_y, 10, 10);
        ellipse(t_canyon.x_pos[i]+ 25*t_canyon.width[i]/100, floorPos_y, 10, 10);
        ellipse(t_canyon.x_pos[i] + 25 * t_canyon.width[i]/100+ t_canyon.width[i]*0.5, floorPos_y, 10, 10 );
        ellipse(t_canyon.x_pos[i] + 50* t_canyon.width[i]/100, floorPos_y, 10, 10 );
        pop();
        checkCanyon(t_canyon.x_pos[i], t_canyon.width[i]); // detects if the player is between the canyon under a certain condition, if it's met player falls down.
    }
}

function renderFlagpole(){
    checkFlagpole();
    push();
    strokeWeight(10);
    stroke(255);
    line(flagpole.x_pos, floorPos_y-5, flagpole.x_pos, floorPos_y-100);
    strokeWeight(0.5);
    fill(255,0,0);
    if(flagpole.is_Reached == false){
        rect(flagpole.x_pos+5, floorPos_y-30, 50, 30);
    }
    if(flagpole.is_Reached == true){
        rect(flagpole.x_pos+5, floorPos_y-100, 50, 30);
    }
    pop();    
    
}

// test functions
function checkCollectables(t_collectable)
{
    if(dist(gameChar_x,gameChar_y,t_collectable.x_pos,t_collectable.y_pos)<40){
        t_collectable.isFound = true;
        score += 1;
    }
    
}
function checkCanyon(x_pos, cwidth)
{
    var canyon_xPos = {x1:x_pos+ 25*cwidth/100,
                   x2: x_pos + 25 *cwidth/100+cwidth*0.5
                    }
    if((gameChar_x > canyon_xPos.x1 && gameChar_x < canyon_xPos.x2) && gameChar_y >= floorPos_y){
        canyonfall = true;
        isPlummeting= true;
    }

}
function checkFlagpole(){
    if(gameChar_x > flagpole.x_pos){
        flagpole.is_Reached = true;
    }else{
        flagpole.is_Reached = false;
    }
    
}


//GAME FUNCTIONS

function checkPlayerDie(){
    
    if(gameChar_y > height){
        lives -= 1;
        if(lives > 0){
            startGame();
        }
    }
    for(var i = 0; i < arrowFall.quan; i++)
        {
            if(dist(arrowFall.x[i], arrowFall.y[i]+20, gameChar_x,gameChar_y) < 30)
                {
                    lives -= 1;
                    startGame();
                }
        }

}
    
function startGame(){
    isRight = false;
    isLeft = false;
    isJumping = false;
    isPlummeting = false;
    gameState = 0;
    CameraPosX = 0;
    canyonfall = false;
    arrowFall = arrowDraw(10);
    score = 0;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
    canyons = {
                x_pos: [],
                width: [],
                holder: [700, 200], // temporary holders of randomly generating X and Width.
                hwidth: [100, 150], // reason to create these holders are to avoid overlapping of two canyons which could create bugs. 
                r: round(random(9,15)),
                generateArrays: function(){
                    for(var i = 0;i < this.r; i++)
                        {
                            this.holder.push(round(random(1000+i*50, 5000+i*50)));
                            this.hwidth.push(round(random(75, 150)));
                        }
                    do{ //using do{}while() i stripped away the first number from the holder, pushing it into x_pos.
                        //x_pos[0] will put under an if condition to check if the distance is less than 150 or width of the first that is being used.
                        // x.pos is reversed so the last added number's index is set to 0 and we can continue to use the this method/formula.
                        // x.width is also reversed to sync both the canyons and its width. it took me quite a while to come up with this but I am really proud of this :)
                        
                        this.x_pos.push(this.holder.splice(0, 1)[0]);
                        this.width.push(this.hwidth.splice(0, 1)[0]);
                        this.x_pos.reverse();
                        this.width.reverse();
                        for(var i = this.holder.length; i >= 0; i--)
                            {
                                if(dist(this.x_pos[0], floorPos_y, this.holder[i], floorPos_y) < 150){
                                        this.holder.splice(i, 1);
                                        this.hwidth.splice(i, 1);
                                }
                            }
                    } while(this.holder.length != 0)
                }
    }
    canyons.generateArrays();

	flagpole = {
        x_pos: 5000,
        is_Reached: false
    }
    collectables = [{x_pos: 50, y_pos: floorPos_y-12, size: 50, isFound: false},
                    {x_pos: 1000, y_pos: floorPos_y-12, size: 50, isFound: false},
                    {x_pos: 2000, y_pos: floorPos_y-12, size: 50, isFound: false},
                    {x_pos: 3500, y_pos: floorPos_y-20, size: 70, isFound: false}];
    
    clouds = [{
        x_pos:100,
        y_pos: 100,
        scale: 100
    },{
        x_pos:800,
        y_pos: 150,
        scale: 150
    },{
        x_pos: 450,
        y_pos: 70,
        scale: 80
    },{x_pos: 1500,
      y_pos: 130,
      scale: 100
    },{
        x_pos: 2000,
        y_pos: 110,
        scale: 75
    },{
        x_pos: 2300,
        y_pos: 100,
        scale: 75
    },{
        x_pos: 2500,
        y_pos: 125,
        scale: 105
    },{
        x_pos: 2600,
        y_pos: 130,
        scale: 95
    },{
        x_pos: 2900,
        y_pos: 85,
        scale: 105
    },{
        x_pos: 3100,
        y_pos: 100,
        scale: 105
    },{
        x_pos: 3500,
        y_pos: 65,
        scale: 95
    },{
        x_pos: 4000,
        y_pos: 75,
        scale: 100
    },{
        x_pos: 4250,
        y_pos: 105,
        scale: 115
    },{
        x_pos: 4450,
        y_pos: 85,
        scale: 75
    },{
        x_pos: 5000,
        y_pos: 105,
        scale: 105
    }
    
    ];
    mountains = [{
        x_pos: -400,
        y_pos: floorPos_y,
        scale: 6
    },{
        x_pos:420,
        y_pos:floorPos_y,
        scale:5
    },{
        x_pos: 1200,
        y_pos: floorPos_y,
        scale: 6
    },{
        x_pos: 2200,
        y_pos: floorPos_y,
        scale: 3
    },{
        x_pos: 3200,
        y_pos: floorPos_y,
        scale: 5
    },{
        x_pos: 3500,
        y_pos: floorPos_y,
        scale: 1
    },{
        x_pos: 4200,
        y_pos: floorPos_y,
        scale: 3
    },{
        x_pos: 5000,
        y_pos: floorPos_y,
        scale: 6
    }];
    treePos_x = [-10];
    for(var i= 1; i < 50; i++){
        treePos_x[i] = random(i*200, i*600); 
    }
    treePos_y = height/2-4;
}
function gameOver(){
    push();
    textAlign(CENTER);
    textSize(100);
    text('GAME OVER!\n Press SPACE to continue!', width/2, height/2);
    isLeft =false;
    isRight = false;
    isJumping = false;
    isPlummeting = false;
    pop();
    gameState = 2;
}
function levelComplete(){
    push();
    textAlign(CENTER);
    textSize(100);
    text('LEVEL COMPLETED!',width/2,height/2-100);
    textSize(50);
    text('SCORE: ' + score, width/2+150, height/2);
    text('LIVES: ' + lives, width/2-150, height/2);
    pop();
    isRight = false;
    isLeft = false;
    gameState = 1;
    if(!victorySound.isPlaying()){
        victorySound.play().noLoop();
    }
}
function showLives(){
    for(var l =0 ; l < lives; l++){
        push();
        stroke(255, 0,0);
        strokeWeight(5);
        line(15 + l * 30, 40, 30 + l * 30, 55);
        line(15 + l * 30, 55, 30 + l * 30,40);
        pop();
    }
}
function checkWin(){
    if(flagpole.is_Reached){
        levelComplete();
    }
}
function arrowDraw(num){
    var ar = {
        x: [],
        initialY: 10,
        y: [],
        ySpeed: [],
        quan: num,
        
        generateArrays: function()
        {
          for(var i = 0; i < this.quan; i ++)
              {
                  if(this.x.length != this.quan){
                    this.x.push(random(gameChar_x-width/2, gameChar_x+width/2));  
                    this.ySpeed.push(random(1, 3));        
                  }
              }
        },
        draw: function()
        {
            for(var i = 0; i < this.x.length; i++)
                {
                    fill(0);
                    stroke(0);
                    strokeWeight(2);
                    line(this.x[i], this.y[i], this.x[i], this.y[i]- 50);
                    fill(180);
                    triangle(this.x[i], this.y[i], this.x[i]- 12, this.y[i] - 20, this.x[i]+ 12, this.y[i] - 20);
                }
            },
        update: function()
        {
            for(var i = 0; i < this.quan; i++)
            {
                if(this.y[i] >= floorPos_y){
                    this.y.splice(i, 1);
                    this.x.splice(i, 1);
                    this.ySpeed.splice(i, 1);
                    this.generateArrays();
                }
            }
            for(var i = 0; i < this.quan; i++)
            {
                if(this.y.length < this.quan)
                {
                    this.y.push(this.initialY+this.ySpeed[i]);
                }else
                {
                    this.y[i] += this.ySpeed[i];
                }
            }
            this.draw();
        }
    }
    ar.generateArrays();
    return ar;
}
//
function createEnemies(num){
    this.y = floorPos_y;
    this.enemyX = [];
    this.enemyinc = [];
    this.forwardwalk = true;
    this.backwalk = false;
    this.updateEnemies = function(){
        for(var i = 0 ; i < num; i++)
            {
                this.enemyX.push(random(0, 3000));
                this.enemyinc.push(0);
            }
        
    }
    this.spawnEnemies = function(){
        for(var i = 0; i < this.enemyX.length; i++)
            {
                this.enemymovements(i);
                ellipse(this.enemyX[i], floorPos_y, 50, 50);
            }
    }
    this.enemymovements = function(index){
        for(var x = 0;x < canyons.length; x++)
            if(dist(this.enemyX[index], floorPos_y, canyons.x_pos[x], floorPos_y) < 50){
                this.enemyinc[index] = -2;
            }
           if(dist(this.enemyX[index], floorPos_y, canyons.x_pos[x]+canyons.width[x], floorPos_y) < 50)
                {
                    this.enemyinc[index] = 2;
                }
        
        this.enemyX[index]+= this.enemyinc[index];
    }
    this.updateEnemies();
}