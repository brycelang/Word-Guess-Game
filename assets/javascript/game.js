/* DATA AND VARIABLES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-----------------------------------------*/
var wordArray = [
    { word:"alcazar"},
    { word:"argus"}, 
    { word:"bawbee"},
    { word:"bindlestiff"}, 
    { word:"borborygmus"},
    { word:"bruxism"}, 
    { word:"carphology"},
    { word:"cybersquatting"}, 
    { word:"dragoman"},
];
//isGameRunning will be used to check if game is running  
var isGameRunning = false;

//Generates a random number multplied by the length of the array
var randomNumber = Math.floor(Math.random() * wordArray.length);

//Apply randomNumber to obtain random word (answer).
var random = wordArray[randomNumber].word;

//Establish lettersRemaining (for win);
var lettersRemaining = random.length;

//Set up the answer array to store word (answer) as an array for indexing.
var answerArray = []; 

//Setup alphabet array for letter checking
var alphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

//Check whether the guess is correct
var winScore = 0;

//Set up an incorrect answer array
var wrongAsnwers = [];

//Establish the number of guesses.
var guessesLeft = 9;

// The words we will use for the game will be stored here



/* Initalize (or re-initialize) the game.~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function init() {
    //Changes isGameRunning to true.
    isGameRunning = true;
    
    //Generate a new random number
    randomNumber = Math.floor(Math.random() * wordArray.length);
    
    //uses the randomNumber to choose a word
    random = wordArray[randomNumber].word;
    lettersRemaining = random.length;
    answerArray = []; 

    for (var i = 0; i < random.length; i++) {
            // hides the word with underscores "_"s
            answerArray[i] = "_";
        }

    //Re-establish lettersRemaining (for win)
    lettersRemaining = random.length;
    //sets guessesLeft back to 9
    guessesLeft = 9;
    wrongAsnwers = [];
    attemptsLeft();  
    displayGuess();
    currentWord();
<<<<<<< HEAD
=======
    revealAnswer.textContent = "";
>>>>>>> master
}

/* EVENT LISTENING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//when a key is released it will check if game is running and check player input
// if not it will start the game
document.onkeyup = function(event){
    //If isGameRunning (or game round) has been initialized, then proceed to playing.
    if(isGameRunning == true) {
        checkInput(event);
    } else if (isGameRunning == false) {
        //If isGameRunning is false, re-initialize (or reset) the game.
        init();
    }
};

function checkGuess(guess) {
    if (random.indexOf(guess.key) > -1) {
        //if guess is correct, run correct function.
        correct(guess);
    } else {
        //If guess is incorrect, run incorrect function.
        incorrect(guess);
    }
}

function checkInput(attempt) {
    //If input and is detected check if the input recieved is in the answer.
    if (alphabetArray.indexOf(attempt.key) > -1) {
        checkGuess(attempt);
    }
}

function inputHandler(guess) {
    for (var x = 0; x < random.length; x++) {
        //If guess matches an existing letter in the answer.
        if (guess.key === random[x]) {
            //Push correct letter to answerArray as upperCase.
            answerArray[x] = guess.key.toUpperCase();
           currentWord();
            lettersRemaining--;
            //If letters left has reached 0, user wins. 
            if (lettersRemaining === 0) {
                winScore++;
               displayWins();
               currentWord();
               init();
               alert("you have won!");
            }
        }
    }
}

function correct(guess) {
    if (answerArray.indexOf(guess.key.toUpperCase()) < 0) {
        //If the correct doesn't exist in the answerArray, run the inputHandler function.
        inputHandler(guess);
    }
}

function incorrect(guess) {
    if (wrongAsnwers.indexOf(guess.key.toUpperCase()) < 0) {
        //If the guess doesn't exist in the answerArray, run incorrectLetter function.
        incorrectLetter(guess);
    }
}

function incorrectLetter(guess) {
     //Push incorrect guess into the wrongAsnwers array
        wrongAsnwers.push(guess.key.toUpperCase());
     //Inform user of incorrect Guesses Made
        displayGuess();
     //Lower guessesLeft by 1
        guessesLeft--;
     //Inform user of guessesLeft
        attemptsLeft();
    if (guessesLeft === 0) {
     //If guesses left reaches equals 0, then restart game.
        init();
    }
}

/* HANDLERS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`*/

//Displays the number of wins user has obtains.
function displayWins() {
    var winsDisplay = document.querySelector("#checkScore");
    winsDisplay.textContent = winScore;
}

//Displays the letters the user has guessed.
function displayGuess() {
    var displayGuess = document.querySelector("#displayGuess");
    displayGuess.textContent = wrongAsnwers.join(", ");
}

//displays how many more times the user can guess.
function attemptsLeft() {
    var attempt = document.querySelector("#checkAttempt");
    attempt.textContent = guessesLeft;
}

//Displays current solve status of answerArray.
function currentWord() {
    var currentWord = document.querySelector("#currentWord");
    currentWord.innerHTML = answerArray.join(" ");
}


