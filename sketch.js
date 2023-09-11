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
    jumpSound.setVolume(0.009);
    backgroundSound = loadSound('assets/background.wav');
    backgroundSound.setVolume(0.05);
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
var gameState = -1; // -1 = intro, 0 = working game, 1 = win, 2 = game over.
var lives;
var arrowFall;
//objects
var canyons;
var collectables;
var clouds;
var mountains;
var flagpole;
let healthbar; 
var treePos_x; //array
var treePos_y;

// Gradient Background
let c1, c2;
let cord1;
let cord2;
function setup()
{
    
	createCanvas(1024, 576);
    floorPos_y = height * 3/4;
    backgroundSound.play();
    lives = 3;
    startGame();
    enemy = new createEnemies(6);
}
    
function draw()
{
if(gameState == -1){
    push();
    background(100, 100, 100);
    stroke(0);
    fill(0);
    textSize(22);
    textAlign(CENTER);
    // tutorial/guide
    text('Welcome!', width/2, 50);
    text('The task is simple, you have to reach the flagpole.', width/2, 100);
    text('There are various obstacles along the way. I am sure you will figure it out yourself.', width/2, 150);
    text('But I must warn you about your clones. They may look friendly but they are hostile creatures.', width/2, 200);
    text('Dodge or Eliminate them! Hold Space to grab them and toss them into the depts of the canyon.', width/2, 250);
    text('Good Luck, Solider! See you on the other side :)', width/2, 300);
    fill(255, 0, 0);
    textSize(35);
    text('Press SPACE to proceed!', width/2, 450);
    pop();
}else{
    ///////////DRAWING CODE////////// //Blue Sky
    push();
     for(let colloop = 0; colloop < cord1; colloop++)
        {
            amt = map(colloop, 0, cord1, 0.3, 1);
            let nc = lerpColor(c1,c2, amt)
            stroke(nc);
            line(0, colloop, width, colloop);
            
        }
    for(let colloop = cord1; colloop < cord2; colloop++)
        {
            amt = map(colloop, cord1, cord2, 0.05, .75);
            let nc = lerpColor(c3,c4, amt)
            stroke(nc);
            line(0, colloop, width, colloop);
            
        }
    pop();
    
    textSize(30);
    
    //Ground
    push();
    noStroke();
	fill(34,139,34);
	rect(0, floorPos_y, width, height - floorPos_y);
    pop();
    
    //Implementing SideScrolling
    push();
    translate(-CameraPosX, 0);
    //Mountain behind everything except clouds.
    mountains.drawMountain();   
    //cloud
    drawClouds();
    
    // tree here
    drawTrees();
    
    //drawCanyon draws and calls another function called checkCanyons.
    drawCanyon(canyons); 
    renderFlagpole();
    // The function >> drawCollectables also calls another function checkCollectables. 
    drawCollectable(collectables);
    enemy.displayEnemies();
    
    //display healthbar; - Whenever player is in contact with the clone, they damage him -50. (CODE AT LINE 897)
    push();
    tbar = map(healthbar, 0, 100, 0, 50);
    fill(128,0,0);
    rect(gameChar_x - 25, gameChar_y-100, 50, 05);
    fill(255,0,0);
    rect(gameChar_x - 25, gameChar_y-100, tbar, 05);
    pop();

    
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
    arrowFall.update();
    pop(); // End of SideScrolling
    //SCORE Counter
    fill(0);
    text("SCORE: " + score, 10, 30);
	///////////INTERACTION CODE//////////
    if(isJumping){ 
        gameChar_y = floorPos_y - 100;
    }
    if(isRight){
//        if()
        if(gameChar_x > width/2)
            {
                CameraPosX +=4;
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
    checkFlagpole();
}
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
        isPlummeting = true 
    }
    if(keyCode == 32){
        if(gameState == -1)
        {
            gameState = 0;
        }
        if(gameState == 0)
        {
            enemy.enemygrab();
        }
        if(gameState == 2){
            lives = 3;
            startGame();
            enemy.generateEnemies();
            gameState = 0;
        }
    }
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
    if(keyCode == 32 && gameState == 0)
        {
            enemy.enemydrop();
        }
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
    
function drawCanyon()
{
    for(var i =0; i < canyons.x_pos.length; i++){
        
        push();
        fill(92, 64, 51);
        noStroke();
        rect(canyons.x_pos[i], floorPos_y, canyons.width[i]*1, 100);
        rect(canyons.x_pos[i]-20*canyons.width[i]/100, floorPos_y+58, canyons.width[i]*1.40, 100);
        stroke(100,50,230);
        fill(100,50,230);
        rect(canyons.x_pos[i]+25*canyons.width[i]/100, floorPos_y, canyons.width[i]*0.5, canyons.width[i]);
        ellipse(canyons.x_pos[i]+50*canyons.width[i]/100, floorPos_y+canyons.width[i], canyons.width[i]/2, canyons.width[i]);
        pop();
        checkCanyon(canyons.x_pos[i], canyons.width[i], gameChar_x, gameChar_y); // detects if the player is between the canyon under a certain condition, if it's met player falls down.
    }
}

function renderFlagpole(){
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
function checkCanyon(x_pos, cwidth, targetx, targety)
{
    var canyon_xPos = {x1:x_pos+ 25*cwidth/100,
                   x2: x_pos + 25 *cwidth/100+cwidth*0.5
                    }
    if((targetx > canyon_xPos.x1 && targetx < canyon_xPos.x2) && targety >= floorPos_y){
        if(targetx == gameChar_x)
            {
            canyonfall = true;
            isPlummeting= true;
            }
        else{
            return true;
        }
    }

}
function checkFlagpole(){
    if(gameChar_x > flagpole.x_pos){
        flagpole.is_Reached = true;
        levelComplete();
        gameState = 1;
    }else{
        flagpole.is_Reached = false;
    }
    
}


//GAME FUNCTIONS

function checkPlayerDie(){
    
    if(gameChar_y > height  && gameState == 0){
        lives -= 1;
        if(lives > 0){
            enemy.enemydrop();
            startGame();
        }
    }

}
    
function startGame()
{
    c1 = color(0,255,255);
    c2 = color(255,215,0);
    c3 = color(255,215,0);
    c4 = color(255,69,0);
    healthbar = 100;
    let df = 100;
    cord1 = height - ((height-floorPos_y) + df);
    cord2 = cord1 + df; 
    isRight = false;
    isLeft = false;
    isJumping = false;
    isPlummeting = false;
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
                        // x.width is also reversed to sync both the canyons and its width.
                        
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
    mountains = {
        x_pos : [0, 700, 1200, 1500, 1800, 2200, 2600, 3400, 3800, 4500, 4900, 5500],
        scale : [5, 2, 3, 6, 4, 3, 6, 3, 3, 4, 3, 5],
        col : [color(60,60,60), color(60,60,60), color(60,60,60), color(60,60,60), color(60,60,60),color(60,60,60),color(60,60,60),color(60,60,60),color(60,60,60),color(60,60,60),color(60,60,60),color(60,60,60)],
        initialize : function(){
            for(var i = 0; i < random(30, 55); i++)
                {
                    this.x_pos.push(round(random(0, 5000)));
                    this.scale.push(random(0, 2.5));
                    this.col.push(color(random(0, 130), random(120, 255), random(113,230), 70));
                }
        },
        drawMountain: function(){
                 for(var i= this.x_pos.length-1;i >= 0; i--)
                 {
                        push();
                        fill(this.col[i]);
                        noStroke();
                        beginShape();
                            vertex(this.x_pos[i],floorPos_y);
                            vertex(this.x_pos[i]+130*this.scale[i],floorPos_y);
                            vertex(this.x_pos[i] + 86*this.scale[i],floorPos_y-84* this.scale[i]);
                            vertex(this.x_pos[i]+59*this.scale[i],floorPos_y- 93*this.scale[i]);
                            vertex(this.x_pos[i]+16*this.scale[i],floorPos_y- 38 * this.scale[i]);
                        endShape(); 
                        pop();
                }
    }
    };
    mountains.initialize();
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
    backgroundSound.pause();
    if(!victorySound.isPlaying()){
        victorySound.play();
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
            for(var i = 0; i < arrowFall.quan; i++)
        {
            if(dist(this.x[i], this.y[i]+20, gameChar_x,gameChar_y) < 30)
                {
                    if(gameState == 0)
                        {
                        enemy.enemydrop();
                        lives -= 1;
                        startGame();
                        }
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
    this.enemyCords = [];
    this.enemyinc = [];
    this.enemyface = [];
    this.enemygrabbed = null; //index; 
    this.generateEnemies = function(){
        for(var i = 0 ; i < num; i++)
            {
                this.enemyCords.push({x:random(800+i*0.5, 3000+i*0.5), y:floorPos_y});
                this.enemyinc.push(2);
                this.enemyface.push('right');
            }
        
    }
    this.displayEnemies = function(){
       for(var i = 0; i < this.enemyCords.length; i++)
                    {
                                if(this.enemyface[i] == 'right')
                                    {
                                        fill(255, 220, 150);
                                        ellipse(this.enemyCords[i].x, this.enemyCords[i].y-50, 15, 20);rect(this.enemyCords[i].x-4, this.enemyCords[i].y-41, 6,3); //head and neck
                                        strokeWeight(0.5);stroke(0);
                                        beginShape();
                                        vertex(this.enemyCords[i].x-6,this.enemyCords[i].y-17);vertex(this.enemyCords[i].x-10,this.enemyCords[i].y+1);vertex(this.enemyCords[i].x-5,this.enemyCords[i].y+1);vertex(this.enemyCords[i].x+2,this.enemyCords[i].y-12);
                                        endShape();
                                        beginShape();
                                        vertex(this.enemyCords[i].x+4,this.enemyCords[i].y-17);vertex(this.enemyCords[i].x+13,this.enemyCords[i].y+1);vertex(this.enemyCords[i].x+7,this.enemyCords[i].y+1);vertex(this.enemyCords[i].x-3.5,this.enemyCords[i].y-12);
                                        endShape();
                                        fill(255,0,0);
                                        rect(this.enemyCords[i].x-8, this.enemyCords[i].y-37, 15, 20);
                                        fill(0,0,255);strokeWeight(0.5);stroke(0);rect(this.enemyCords[i].x-3,this.enemyCords[i].y-17,10,5);strokeWeight(0);rect(this.enemyCords[i].x-8,this.enemyCords[i].y-17,7.5,5);
                                        fill(167,114,28);strokeWeight(1);ellipse(this.enemyCords[i].x,this.enemyCords[i].y-60,13,13); rect(this.enemyCords[i].x-13,this.enemyCords[i].y-57, 25,5);//clothing
                                        fill(255,220,150);
                                        strokeWeight(0.5);
                                        beginShape();
                                        vertex(this.enemyCords[i].x+5,this.enemyCords[i].y-31);vertex(this.enemyCords[i].x+21,this.enemyCords[i].y-17);vertex(this.enemyCords[i].x+15,this.enemyCords[i].y-17);vertex(this.enemyCords[i].x-4,this.enemyCords[i].y-31);
                                        endShape();
                                    }
                                else if(this.enemyface[i] == 'left')
                                    {
                                        fill(255, 220, 150);
                                        ellipse(this.enemyCords[i].x, this.enemyCords[i].y-50, 15, 20);rect(this.enemyCords[i].x-4, this.enemyCords[i].y-41, 6,3); //head and neck
                                        strokeWeight(0.5);stroke(0);
                                        beginShape();
                                        vertex(this.enemyCords[i].x+5,this.enemyCords[i].y-17);vertex(this.enemyCords[i].x+9,this.enemyCords[i].y+1);vertex(this.enemyCords[i].x+4,this.enemyCords[i].y+1);vertex(this.enemyCords[i].x-3,this.enemyCords[i].y-12);
                                        endShape();
                                        beginShape();
                                        vertex(this.enemyCords[i].x-4,this.enemyCords[i].y-17);vertex(this.enemyCords[i].x-13,this.enemyCords[i].y+1);vertex(this.enemyCords[i].x-7,this.enemyCords[i].y+1);vertex(this.enemyCords[i].x+3,this.enemyCords[i].y-12);
                                        endShape();

                                        fill(255,0,0);
                                        rect(this.enemyCords[i].x-8, this.enemyCords[i].y-37, 15, 20);
                                        fill(0,0,255);strokeWeight(0.5);stroke(0);rect(this.enemyCords[i].x-8,this.enemyCords[i].y-17,10,5);strokeWeight(0);rect(this.enemyCords[i].x-0.5,this.enemyCords[i].y-17,7.5,5);fill(167,114,28);strokeWeight(1);ellipse(this.enemyCords[i].x,this.enemyCords[i].y-60,13,13); rect(this.enemyCords[i].x-13,this.enemyCords[i].y-57, 25,5);//clothing
                                        fill(255,220,150);
                                        strokeWeight(0.5);
                                         beginShape();
                                        vertex(this.enemyCords[i].x-5,this.enemyCords[i].y-31);vertex(this.enemyCords[i].x-21,this.enemyCords[i].y-17);vertex(this.enemyCords[i].x-15,this.enemyCords[i].y-17);vertex(this.enemyCords[i].x+4,this.enemyCords[i].y-31);
                                        endShape();
                                    }
                                else if(this.enemyface[i] == 'front')
                                    {
                                        fill(255, 220, 150);strokeWeight(0);  
                                        ellipse(this.enemyCords[i].x, this.enemyCords[i].y-50, 20, 20);rect(this.enemyCords[i].x-4, this.enemyCords[i].y-41, 8,5);strokeWeight(0.5);stroke(1);rect(this.enemyCords[i].x-13,this.enemyCords[i].y-33, 5,15);rect(this.enemyCords[i].x+7,this.enemyCords[i].y-33, 5,15);rect(this.enemyCords[i].x-7,this.enemyCords[i].y-12,5,15);rect(this.enemyCords[i].x,this.enemyCords[i].y-12,5,15);//skin
                                        fill(255,0,0);strokeWeight(0);
                                        rect(this.enemyCords[i].x-8, this.enemyCords[i].y-37, 15, 20);rect(this.enemyCords[i].x-8,this.enemyCords[i].y-37, -5,5);rect(this.enemyCords[i].x+7,this.enemyCords[i].y-37, 5,5);
                                        fill(0,0,255);strokeWeight(0.5);stroke(0);rect(this.enemyCords[i].x-8,this.enemyCords[i].y-17,7.5,5);rect(this.enemyCords[i].x-0.5,this.enemyCords[i].y-17,7.5,5);fill(167,114,28);;ellipse(this.enemyCords[i].x,this.enemyCords[i].y-65,13,13); rect(this.enemyCords[i].x-13,this.enemyCords[i].y-62, 25,5);
                                    }
                                this.updateEnemies(i);
                                }
    }
    this.updateEnemies = function(i){
        if(this.enemygrabbed == i){
            this.enemyface[this.enemygrabbed] = 'front';
            this.enemyinc[this.enemygrabbed] = 0;
            if(isRight)
                {
                    this.enemyCords[i].x = gameChar_x + 30;
                    this.enemyCords[i].y = gameChar_y;
                }
            if(isLeft)
                {
                    this.enemyCords[i].x = gameChar_x - 30;
                    this.enemyCords[i].y = gameChar_y;
                }
            if(!isLeft && !isRight)
                {
                    this.enemyCords[i].y = gameChar_y;
                }
        }else{
                if(dist(gameChar_x, floorPos_y, this.enemyCords[i].x, this.enemyCords[i].y) < 2)
                            {
                                if(healthbar > 0 && this.enemyface[i] != 'front'){
                                    healthbar -= 50;
                                    var tempface;
                                    var tempinc;  
                                    tempface = this.enemyface[i];
                                    tempinc = this.enemyinc[i];
                                    this.enemyface[i] = 'front';
                                    this.enemyinc[i] = 0;
                                    setTimeout(() => { this.enemyface[i] = tempface; }, 5000);
                                    setTimeout(() => { this.enemyinc[i] = tempinc; }, 5000);
                                }
                                if(healthbar <= 0){
                                                    lives --;
                                                    this.enemydrop();
                                                    startGame();
                                                }
                                }

                for(var x = 0; x < canyons.x_pos.length; x++)
                    {
                    if(checkCanyon(canyons.x_pos[x], canyons.width[x], this.enemyCords[i].x, this.enemyCords[i].y) || this.enemyCords[i].y > floorPos_y)
                            {
                                this.enemyCords[i].y += 2;
                                this.enemyinc[i] = 0;
                                this.enemyface[i] = 'front';
                            }
                    else if(dist(canyons.x_pos[x], floorPos_y, this.enemyCords[i].x, floorPos_y) < 5){
                            this.enemyinc[i] = -2;
                            this.enemyface[i] = 'left';

                    }
                    else if(dist(canyons.x_pos[x]+canyons.width[x], floorPos_y, this.enemyCords[i].x, floorPos_y) < 5 || this.enemyCords[i].x < 2){
                            this.enemyinc[i] = +2;
                            this.enemyface[i] = 'right';
                    }
                    }
                this.enemyCords[i].x += this.enemyinc[i];
            }
        if(this.enemyCords[i].y > height){
            this.enemyCords.splice(i, 1);
            this.enemyface.splice(i, 1);
            this.enemyinc.splice(i, 1);
            
        }
        }
    this.enemygrab = function(){
        for(var i =0; i < this.enemyCords.length; i++)
            {
                if(this.enemygrabbed == null)
                {
                    
                    if(dist(this.enemyCords[i].x, this.enemyCords[i].y, gameChar_x, floorPos_y) < 70)
                        {
                            this.enemygrabbed = i;
                        }
                }
            }
    }
    this.enemydrop = function()
    {
        if(this.enemygrabbed != null)
            {
            var temp = {face:['right','left'],
                        inc:[2, -2]};
            var rnum = round(random(0,1));
            var tindex = this.enemygrabbed;
            this.enemygrabbed = null;
            setTimeout(() => {this.enemyface[tindex] = temp.face[rnum]; }, 5000);
            setTimeout(() => {this.enemyinc[tindex] = temp.inc[rnum];}, 5000);
            this.enemyCords[tindex].y = floorPos_y;
                
            }
    }
    this.generateEnemies();
}
