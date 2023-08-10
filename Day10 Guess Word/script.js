import {wordsWithHints} from './programmingWords.js'
document.addEventListener("DOMContentLoaded", () => {
        
        const hint = document.querySelector('.hint');
        const wrongLetters = document.querySelector('.wrong-letters');
        const chanceDisplay = document.querySelector('.chance');
        const wordCheckInput = document.querySelector('.word-check');
        const playAgainButton = document.querySelector('.play-again');
        const wordsContainer = document.querySelector('.words');
        const message = document.querySelector('.message');
    
        let currentWordIndex = 0;
        let currentWord = "";
        let guessedLetters = [];
        let wrongGuessedLetters = [];
        let chancesLeft = 5;
    
        function updateWordDisplay() {
            wordsContainer.innerHTML = currentWord
                .split("")
                .map(letter => `<div class="word">${guessedLetters.includes(letter) ? (letter).toUpperCase() : "_"}</div>`)
                .join("");
        }
    
        function showWrongLetters() {
            wrongLetters.textContent = wrongGuessedLetters.join(", ");
        }
    
        function checkGuess() {
            const guess = wordCheckInput.value.toLowerCase();
            if (!guess.match(/[a-z]/)) {
                return; // Ignore non-letter input
            }
    
            if (guessedLetters.includes(guess) || wrongGuessedLetters.includes(guess)) {
                return; // Ignore repeated letters
            }
    
            if (currentWord.includes(guess)) {
                guessedLetters.push(guess);
                updateWordDisplay();
    
                if (guessedLetters.length === currentWord.length) {
                    message.style.display = "block";
                    message.style.color = "green";
                    message.textContent = "Congratulations! You guessed the word!";
                    wordCheckInput.disabled = true;
                }
            } else {
                wrongGuessedLetters.push(guess);
                showWrongLetters();
                chancesLeft--;
                chanceDisplay.textContent = chancesLeft;

    
                if (chancesLeft === 0) {
                    message.style.display = "block";
                    message.textContent = `You ran out of chances! The correct word was:`;
                    //show the answer in word container
                    wordsContainer.innerHTML = `${currentWord.split("").map(letter => `<div class="word">${(letter).toUpperCase()}</div>`).join("")}`;
                    wordCheckInput.disabled = true;
                } 
            }
            
    
            wordCheckInput.value = "";
        }
    
        function playAgain() {
            currentWordIndex = Math.floor(Math.random() * wordsWithHints.length);
            currentWord = wordsWithHints[currentWordIndex].word.toLowerCase();
            guessedLetters = [];
            wrongGuessedLetters = [];
            chancesLeft = Math.max(currentWord.length - 2, 3);
            message.style.display = "none";
    
            hint.textContent = `Hint: ${wordsWithHints[currentWordIndex].hint}`;
            wrongLetters.textContent = "";
            chanceDisplay.textContent = chancesLeft;
            message.textContent = "";
            wordCheckInput.disabled = false;
            updateWordDisplay();
        }
    
        wordCheckInput.addEventListener('input', () => {
            message.textContent = "";
        });
    
        wordCheckInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkGuess();
            }
        });
    
        playAgainButton.addEventListener('click', playAgain);
    
        playAgain(); // Start the game when the page loads
    });
