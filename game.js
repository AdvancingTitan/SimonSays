
var buttonColours = new Array("red", "green", "blue", "yellow");
var gamePattern = new Array();
var userClickedPattern = new Array()
var level = 0;
var patternCounter = 0;
var started = false;

// *** Functions ***
function nextSequence() {
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];

  level += 1;
  $("h1").html("Level " + level); //Show level # to player
  gamePattern.push(randomChosenColour);
  $('#'+ randomChosenColour).fadeOut(100).fadeIn(100); // Button blink
  playSound(randomChosenColour);

  return randomChosenColour;
}

// Play corresponding sound for each colour
function playSound(name) {
  let colourSound = new Audio("sounds/"+ name +".mp3");
  colourSound.play();
}

function animatePress(currentColour) {
  $('#'+ currentColour).addClass("pressed");
  setTimeout(()=> {
    $('#'+ currentColour).removeClass("pressed")
  }, 100)
}

// *** Event Listeners ***
$(document).on("keypress", (function(){
  if (started == false) {
    nextSequence();
    started = true;
  } else {
    $(document).off("keypress", "**") // If game has started, keypress listener is turned off
  }
}))

$(".btn").click(function(event) {
  var userChosenColour = this.id;

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(level-1);

  return console.log(patternCounter);
})

// *** Gameplay ***
function checkAnswer(currentLevel) {
    if (userClickedPattern[patternCounter] == gamePattern[patternCounter]) {
      console.log("yes");
    } else {
      gameOver();
      return;
    }

    if (patternCounter === currentLevel) { //Checks if click is last one in level's sequence before moving to the next level
      nextLevel();
    } else {
      patternCounter += 1;
    }
}

function nextLevel() {
  patternCounter = 0;
  userClickedPattern = []; // Empties user array

  setTimeout(()=> {
    nextSequence();
  }, 1000)
}

function gameOver(){
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(()=> {
    $("body").removeClass("game-over");
  }, 200)
  $("h1").html("Game Over, Press Any Key to Restart");

  $(document).on("keypress", (function(){
      resetOver();

  }))

  console.log ("G-O");
}

function resetOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  patternCounter = 0;
  started = false;

  $("h1").html("Press A Key to Start");
}
