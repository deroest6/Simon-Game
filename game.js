var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;

var started = false;

if (typeof $ !== "undefined") {
  $(document).keydown(function() {
    if (!started) { // Start = False
      $("h1").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


  // Takes the color user clicks on and returns it to userClickedPattern
  $(".btn").click(function() {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    console.log("Start checking answer...");
    checkAnswer(userClickedPattern.length - 1);
  });
}



// Checks the user's chosen color against the current game pattern; if correct, advance to the next level


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      if (userClickedPattern.length === gamePattern.length) {

        setTimeout(function() {
          nextSequence();
        }, 1000);

        userClickedPattern = [];
        console.log("Success");
    }

  } else {

      playSound("wrong");
      console.log("Failed");

      $("body").addClass("game-over");
      setTimeout(function () {
        $('body').removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over! Press Any Key to Restart");
      startOver();
  }
}


function startOver() {
  started = false;

  gamePattern = [];
  userClickedPattern = [];

  level = 0;
}

// Updates level, fades new button color
function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  // Pushes Random Color to gamePattern[]
  // There are four colours in buttonColors, generate a value between 0-3
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Fade new random color in and out
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


//Flash effect for clicked buttons
function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    startOver: startOver,
    getLevel: function () { return level; },
    getGamePattern: function () { return gamePattern; },
    getUserClickedPattern: function () { return userClickedPattern; },
    setLevel: function (val) { level = val; },
    setGamePattern: function (val) { gamePattern = val; },
    setUserClickedPattern: function (val) { userClickedPattern = val; }
  };
}


// EXTRA FUNCTIONALITY

// (1)
// Upon the user getting a Game Over, use javascript to add a button to the page below the h1 and refresh the page upon *clicking* on it. (Prevent confusion over how to refresh page)
// function refreshPage () {
//   window.location.reload();
// }
