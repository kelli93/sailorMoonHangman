//Create Variables 

var selectableWords = [
  "Sailor",
  "Moon",
  "Venus",
  "Mars",
  "Jupiter",
  "Uranus",
  "Saturn",
  "Pluto",
  "Neptune",
  "Diana",
  "Tuxedo Mask",
  "Luna",
  "Diana",
  "Mercury",
];


const maxTries = 10;

var guessedLetters = [];
var currentWordIndex;
var guessingWord = [];
var remainingGuesses = 0;
var gameStarted = false;
var hasFinished = false;
var wins = 0;


//Reset Game

function resetGame() {
  remainingGuesses = maxTries;
  gameStarted = false;

  currentWordIndex = Math.floor(Math.random() * (selectableWords.length));

  guessLetters = [];
  guessingWords = [];
  
  document.getElementById("hangmanImage").src = "";

  for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
    guessingWord.push("_");
  }

  document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
  document.getElementById("gameover-image").style.cssText = "display: none";
  document.getElementById("youwin-image").style.cssText = "display: none";

  updateDisplay ();
};



//  Update display

function updateDisplay() {

  document.getElementById("totalWins").innerText = wins;
  document.getElementById("currentWord").innerText = "";

  for (var i = 0; i < guessingWord.length; i++) {
      document.getElementById("currentWord").innerText += guessingWord[i];
  }

  document.getElementById("remainingGuesses").innerText = remainingGuesses;
  document.getElementById("guessedLetters").innerText = guessedLetters;

  if(remainingGuesses <= 0) {
      document.getElementById("gameover-image").style.cssText = "display: block";
      document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
      hasFinished = true;
  }
};


// Update Image
function updateHangmanImage() {
  document.getElementById("hangmanImage").src = "assets/images/" + (maxTries - remainingGuesses) + ".gif";
};


document.onkeydown = function(event) {
  
  if(hasFinished) {
      resetGame();
      hasFinished = false;
  } else {
    
      if(event.keyCode >= 65 && event.keyCode <= 90) {
          makeGuess(event.key.toLowerCase());
      }
  }
};


//Make Guess

function makeGuess(letter) {
  if (remainingGuesses > 0) {
      if (!gameStarted) {
          gameStarted = true;
      }

      // Make sure we didn't use this letter yet
      if (guessedLetters.indexOf(letter) === -1) {
          guessedLetters.push(letter);
          evaluateGuess(letter);
      }
  }
  
  updateDisplay();
  checkWin();
};

//Exaluate Guess

function evaluateGuess(letter) {
  
  var positions = [];

  
  for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
      if(selectableWords[currentWordIndex][i] === letter) {
          positions.push(i);
      }
  }

  if (positions.length <= 0) {
      remainingGuesses--;
      updateHangmanImage();
  } else {

      for(var i = 0; i < positions.length; i++) {
          guessingWord[positions[i]] = letter;
      }
  }
};


//Check Win

function checkWin() {
  if(guessingWord.indexOf("_") === 1) {
      document.getElementById("youwin-image").style.cssText = "display: block";
      document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
      wins++;
      hasFinished = true;
  }
};


