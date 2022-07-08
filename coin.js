// List p5 functions below so glitch will recognize them
/* global createCanvas, background, colorMode, HSB, noStroke, color, fill, ellipse,image,
text, stroke, line, width, height, mouseX, mouseY, loadSound, key, loadImage, createImage
createSlider, createButton, quad, rect, imageMode, cursor, triangle, noCursor, random, reset, textSize, createImg, collideCircleCircle, backgroundImage, loadFont, textFont, loadSound, backgroundSound, gameOver
*/

// Names: Sristi Panchu, Irene Liao

// Below are variables WE are defining, not those defined by p5 (included at the top)
let brushHue, restartButton, backgroundColor, coinX, coinY, score, time, gameIsOver, hit, coin, mario, myFont, soundBing;

function setup() {
  // Canvas & color settings
  createCanvas(650, 500);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  backgroundColor = 95;
  coinX = random(width);
  coinY = random(height);
  time = 1000;
  gameIsOver = false;
  score = 0;
  hit = false;
  backgroundImage = loadImage('https://cdn.glitch.com/8da09e0d-475f-48db-96e3-d46beae018c9%2Fpic1.jpeg?v=1626705620215');
  coin = loadImage('https://cdn.glitch.com/8da09e0d-475f-48db-96e3-d46beae018c9%2Fcoin.png?v=1626703336522');
  mario = loadImage('https://cdn.glitch.com/8da09e0d-475f-48db-96e3-d46beae018c9%2Fmario.png?v=1626704647170');
  myFont = loadFont('https://cdn.glitch.com/8da09e0d-475f-48db-96e3-d46beae018c9%2Ffipps.otf?v=1626705454559');
  soundBing = loadSound('https://cdn.glitch.com/8da09e0d-475f-48db-96e3-d46beae018c9%2F8d82b5_Super_Mario_Bros_Coin_Sound_Effect.mp3?v=1626707019083');
  backgroundSound = loadSound('https://cdn.glitch.com/8da09e0d-475f-48db-96e3-d46beae018c9%2FSuper%20Mario%20Bros.%20Soundtrack.mp3?v=1626707031433');
  gameOver = loadImage('https://cdn.glitch.com/8da09e0d-475f-48db-96e3-d46beae018c9%2Fmaxresdefault.jpeg?v=1626709772887');
  restartButton = createImg('https://cdn.glitch.com/8da09e0d-475f-48db-96e3-d46beae018c9%2FRESET-removebg-preview.png?v=1626708490666');
  restartButton.size(200, 85);
  restartButton.position(242, 385);
  restartButton.mousePressed(refreshGame);
  restartButton.hide();
}

function draw() {
  // Change the hit boxes & cursor
  
  background(backgroundImage);
  image(coin, coinX, coinY, 35, 35);
  image(mario, mouseX, mouseY, 35, 50);
  textFont(myFont);
  fill('black');
  textSize(12);
  text(`Time remaining: ${time}`, 20, 40);
  // Display score
  text(`Score: ${score}`, 250, 40);
  handleTime();
  
  
  // If game is over, display text.
  if (gameIsOver)
  {    
    background(gameOver);
    
    textSize(18);
    fill('white');
    text(`Score: ${score}`, 265, 380);
    
    textSize(35);
    fill('white');
    text(`Game over!`, 180, 170);
    
    restartButton.show();
  
    // TODO - display 'game over' text in rect, button that says 'restart game',
    //keep track of score/display it in the box
  } else {
    // Check whether there is a collision
    // true when circle (mouseX, mouseY, 20) collides with circle (coinX, coinY, 20)
    hit = collideCircleCircle(mouseX, mouseY, 20, coinX, coinY, 20);
    fill('black');
    textSize(12);
    text(`Collision: ${hit}`, 20, 60);
    noCursor();
    if (hit) {
      handleCollision();
      // soundBing.volume(0.2);
      soundBing.play();
      restartButton.hide();
    }
  }

} 

function handleCollision() {
  // We'll write code for what happens if your character hits a coin.

  // Update score
  score += 1;
  
  // Move coin to new random location & ensure it doesn't go out of bounds
  coinX = random(width);
  coinY = random(height);
  let xArray = [40, 50, 60, 70];
  let yArray = [50, 70, 100, 300];
  
  if ((coinX <= 35) || (coinX >= 625) || (coinY >= 250) || (coinY <= 35)) {
  coinX = random(xArray);
  coinY = random(yArray);   
  }
  
  
  
  /*if (soundBing.isPlaying())
  {
    soundBing.stop();
  } 
  else {
    soundBing.stop();
  } */
}

function handleTime() {
  // We'll write code to handle the time.
  if (time <= 0) {
    gameIsOver = true;
  } else {
    time -= 1;
  }

  // TODO - way to restart the game?
}


function backMusic () {
  backgroundSound.play();
}

function refreshGame () {
  time = 1000;
  gameIsOver = false;
  score = 0;
  hit = false;
  restartButton.hide();
}
