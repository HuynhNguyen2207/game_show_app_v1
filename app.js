// Declare Variables
const qwertyDiv = document.querySelector('#qwerty');
const phraseDiv = document.querySelector('#phrase');
const scoreBoard = document.querySelector('#scoreboard ol');
const overlay = document.querySelector('#overlay');
const title = overlay.querySelector('.title');
const startBtn = overlay.querySelector('.btn__reset');
const phrases = ['I am John', 'I like cake', 'Cake is sweet', 'I ate cake', 'I am full'];
let missed = 0;

// Add a click event listener to startBtn
startBtn.addEventListener('click', () => {
  if (startBtn.innerHTML === 'Start Game') {
    // Change the overlay display to none
    overlay.style.display = 'none';
  }
});

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
    document.querySelector('#phrase ul').appendChild(listItem);
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

// Generate a random phrase from the phrases array then display it
const randomPhrase = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(randomPhrase);

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
