/** @format */

const wordEl = document.getElementById('word');
const wrongLetterEl = document.getElementById('wrong-letters');
const playAgain = document.getElementById('popup-container');
const playAgainBtn = document.getElementById('play-button');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');
const words = ['application', 'programming', 'interface', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLetters = [];
//show hidden word
function displayWord() {
  wordEl.innerHTML = `
  ${selectedWord
    .split('')
    .map(
      (letter) => `
    
    <span class ="letter">
      
   ${correctLetters.includes(letter) ? letter : ''} 
    </span>
    `
    )
    .join('')}
    `;
}
const innerWord = wordEl.innerText.replace(/\n/g, '');
if (innerWord === selectedWord) {
  finalMessage.innerText = 'congratulations! You Won ';
  playAgain.style.display = 'flex';
}

function updateWrongLetterEL() {
  wrongLetterEl.innerHTML = `${wrongLetters.length > 0 ? '<p>wrong</p>' : ''}
  ${wrongLetters.map((letter) => `<span>'${letter}'</span>`)}
  `;
  figureParts.forEach((part, index) => {
    const error = wrongLetters.length;

    if (index < error) {
      part.style.display = 'block';
    } else part.style.display = 'none';
  });
  //check if you lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'unfortunately You Lost. ';
    playAgain.style.display = 'flex';
  }
}

function showNotification() {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}
//key down letter press
window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else showNotification();
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetterEL();
      } else showNotification();
    }
  }
});
//restart play
playAgainBtn.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLetterEL();
  playAgain.style.display = 'none';
});
displayWord();
