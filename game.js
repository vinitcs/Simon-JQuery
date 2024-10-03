// alert("hello")

const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  // console.log(randomNumber);

  let randomChosenColour = buttonColours[randomNumber];
  // console.log(randomNumber, randomChosenColour);

  gamePattern.push(randomChosenColour);
  //   console.log(gamePattern);


  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

// Func for sound effects file access and play
function playSound(name) {
  let audio = new Audio("./sounds/" + name + ".mp3");
  //   console.log(audio);

  audio.play();
}

// Func when on pressing button  
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Restart game by keeping variables bydefault
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
