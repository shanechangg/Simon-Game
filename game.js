buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var started = false;
var level = 0;


function newSequence() {
    userClickedPattern = [];
    level++
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()* (3-0+1))+0; 
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
};

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1);
playSound(userChosenColour);

animatePress(userChosenColour);
});

function playSound(name) {
    var userSound = new Audio("./sounds/" + name + ".mp3");
    userSound.play();
};

function animatePress(currentColour) {
$("#" + currentColour).addClass("pressed");
setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

$(document).keydown(function(event){
    if (!started) {
        $("#level-title").text("Level" + level);
        newSequence();
        started=true;
    }
});

function checkAnswer(currentLevel) {
if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function(){
            newSequence();
        }, 1000);
    } 
    } else {
        console.log("wrong");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key To Restart");
        startOver();
}
} 

function startOver() { 
    level = 0;
    gamePattern = [];
    started = false;
    
}



// var audio = new Audio("./sounds/" + randomChosenColour + ".mp3");
    // audio.play();

