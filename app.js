// Declare Variables
const mainContainer = document.querySelector('.main-container');
const qwertyDiv = document.querySelector('#qwerty');
const phraseDiv = document.querySelector('#phrase');
const ul = phraseDiv.querySelector('ul');
const scoreBoard = document.querySelector('#scoreboard ol');
const overlay = document.querySelector('#overlay');
const title = overlay.querySelector('.title');
const startBtn = overlay.querySelector('.btn__reset');
const phrases = ['I am John', 'I like cake', 'Cake is sweet', 'I ate cake', 'I feel happy'];
let missed = 0;

// Create a button that will get a new phrase
const resetBtn = document.createElement('button');
resetBtn.innerHTML = 'Get a new phrase!';
resetBtn.style.backgroundColor = 'var(--color-start)';
resetBtn.style.color = '#FFF';
mainContainer.appendChild(resetBtn);

// Add a click event listener to startBtn
startBtn.addEventListener('click', () => {
  if (startBtn.innerHTML === 'Start Game') {
    // Change the overlay display to none
    overlay.style.display = 'none';
    newPhrase()
  } else if (startBtn.innerHTML === 'Reset Game') {
    // Change the overlay display to none
    overlay.style.display = 'none';
    resetGame();
    resetButton();
    resetScore();
  }
});

// add Event listener to the resetBtn
resetBtn.addEventListener('click', () => {
  resetGame();
  resetButton();
  resetScore();
});

// Reset the keyboard
function resetButton() {
  const chosenBtn = qwertyDiv.querySelectorAll('.chosen');
  for (let i = 0; i < chosenBtn.length; i++) {
    chosenBtn[i].className = '';
    chosenBtn[i].disabled = false;
  }
}

// Reset the score
function resetScore() {
  const lifeLeft = scoreBoard.querySelectorAll('li.tries');

  if (lifeLeft.length < 5) {
    for (let i = 0; i <= (4 - lifeLeft.length) ; i++) {
      const life = document.createElement('li');
      life.className = 'tries';
      life.innerHTML= '<img src="images/liveHeart.png" height="35px" width="30px">';
      scoreBoard.appendChild(life);
    }
  }
}

function resetGame() {
  // Remove the last phrase
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.lastChild);
  }
  newPhrase()
}

function newPhrase() {
  // Generate a random phrase from the phrases array then display it
  const randomPhrase = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(randomPhrase);
}

// Get a random phrase function
function getRandomPhraseAsArray(array) {
  // Get a random phrase from the input array
  const randomItem = array[Math.floor(Math.random() * array.length)];
  // Split the random phrase into an array of letter
  const splitledArray = randomItem.split('');
  // return the array of letter
  return splitledArray;
}

// Display the phrase function
function addPhraseToDisplay (arr) {
  // Loop through the letter array
  for (i = 0; i < arr.length; i++) {
    // Create the listItem LI tag
    const listItem = document.createElement('li');
    // Assign a letter to the LI tag
    listItem.innerHTML = arr[i];
    // Append listItem to the UL inside #phrase DIV
    ul.appendChild(listItem);
    // Check if the listItem contain a letter or a space character
    if (listItem.innerHTML !== ' ') {
      // Add 'letter' class name to LI tag contain letter
      listItem.className = 'letter';
    } else {
      // Add 'space' class name to LI tag contain space character
      listItem.className = 'space';
    }
  }
}

// Check if the button press matches the letters in the phrase
function checkLetter(button) {
  // Get the array of all the letters in the phrase
  const letters = document.querySelectorAll('.letter');
  // Get the content of the button pressed
  const buttonContent = button.innerHTML.toLowerCase();
  // Delcare the letter variable that the function will return after it is executed
  let letter = null;
  //Loop through the letters array
  for (let i = 0; i < letters.length; i++) {
    // Get the content of the letter div
    const letterContent = letters[i].innerHTML.toLowerCase();
    // Check if button pressed match any letter
    if (letterContent === buttonContent) {
      // Add className show the letter if matched button pressed
      letters[i].className += ' show';
      letters[i].style.transform = 'rotateY(360deg)';
      letters[i].style.transition = 'all 2s';
      // Store it in letter variable
      letter = letters[i];
    }
  }
  // Return the letter variable
  return letter;
}

// Change the overlay div
function changeOverlay(newTitle, newClass) {
  title.innerHTML = newTitle;
  startBtn.innerHTML = 'Reset Game';
  overlay.className = newClass;
  overlay.style.display = 'flex';
  overlay.style.zIndex = '999';
}

// Check if the user win or lose
function checkWin() {
  const letters =  phraseDiv.querySelectorAll('.letter');
  const show = phraseDiv.querySelectorAll('.show');
  if (missed === 5) {
    changeOverlay('you lost the game', 'lose');
  } else if (letters.length === show.length) {
    changeOverlay('you won the game', 'win');
  }
}

// Add an event listener to the keyboard button
qwertyDiv.addEventListener('click', (e) => {
  const key = e.target.innerHTML;
  const buttons = qwertyDiv.querySelectorAll('button');
  for (let j = 0; j < buttons.length; j++) {
    if (key === buttons[j].innerHTML) {
      buttons[j].className = 'chosen';
      buttons[j].disabled = true;
      const letterFound = checkLetter(buttons[j]);
      const tries = scoreBoard.querySelector('li');
      if (letterFound === null) {
        scoreBoard.removeChild(tries);
        missed++;
      }
    }
  }
  checkWin();
});
