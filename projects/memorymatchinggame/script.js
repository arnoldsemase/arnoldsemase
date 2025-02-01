  const gameBoard = document.getElementById('game-board');
        const resultDisplay = document.getElementById('result');
        const timerDisplay = document.getElementById('timer');
        const attemptsDisplay = document.getElementById('attempts');
        const hintsDisplay = document.getElementById('hints');
        const resetBtn = document.getElementById('reset-btn');
        const hintBtn = document.getElementById('hint-btn');
        
        const numbers = Array.from({ length: 8 }, (_, i) => i + 1).flatMap(num => [num, num]);
        let cards = [];
        let flippedCards = [];
        let matchesFound = 0;
        let attempts = 0;
        let hintsLeft = 3;
        let startTime, timerInterval;

        function shuffle(array) {
            return array.sort(() => Math.random() - 0.5);
        }

        function createCard(number) {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.number = number;
            card.addEventListener('click', flipCard);
            return card;
        }

        function setupGame() {
            gameBoard.innerHTML = '';
            resultDisplay.textContent = 'Matches found: 0';
            attemptsDisplay.textContent = 'Attempts: 0';
            hintsDisplay.textContent = `Hints Left: ${hintsLeft}`;
            cards = shuffle(numbers.map(createCard));
            cards.forEach(card => gameBoard.appendChild(card));
            matchesFound = 0;
            flippedCards = [];
            revealCardsTemporarily();
            startTimer();
        }

        function flipCard(event) {
    const card = event.target;
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.textContent = card.dataset.number;
        card.classList.add('flipped');
        flippedCards.push(card);

        
        if (flippedCards.length === 2) {
            attempts += 1; 
            attemptsDisplay.textContent = `Attempts: ${attempts}`;
            checkForMatch();
        }
    }
}


        function checkForMatch() {
            const [card1, card2] = flippedCards;
            if (card1.dataset.number === card2.dataset.number) {
                matchesFound += 1;
                resultDisplay.textContent = `Matches found: ${matchesFound}`;
                if (matchesFound === numbers.length / 2) {
                    resultDisplay.textContent = 'Congratulations! You won!';
                    stopTimer();
                }
                flippedCards = [];
            } else {
                setTimeout(() => {
                    card1.textContent = '';
                    card2.textContent = '';
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                    flippedCards = [];
                }, 1000);
            }
        }

        function revealCardsTemporarily() {
            cards.forEach(card => card.textContent = card.dataset.number);  
            setTimeout(() => {
                cards.forEach(card => {
                    card.textContent = '';  
                    card.classList.remove('flipped');
                });
            }, 3000);  
        }

        function startTimer() {
            startTime = Date.now();
            timerInterval = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                timerDisplay.textContent = `Time: ${elapsed}s`;
            }, 1000);
        }

        function stopTimer() {
            clearInterval(timerInterval);
        }

        function useHint() {
            if (hintsLeft > 0) {
                hintsLeft -= 1;
                hintsDisplay.textContent = `Hints Left: ${hintsLeft}`;
                const hiddenCards = cards.filter(card => !card.classList.contains('flipped'));
                if (hiddenCards.length >= 2) {
                    const [card1, card2] = shuffle(hiddenCards).slice(0, 2);
                    card1.textContent = card1.dataset.number;
                    card2.textContent = card2.dataset.number;
                    card1.classList.add('flipped');
                    card2.classList.add('flipped');
                    setTimeout(() => {
                        card1.textContent = '';
                        card2.textContent = '';
                        card1.classList.remove('flipped');
                        card2.classList.remove('flipped');
                    }, 1000);  
                }
            }
        }

        resetBtn.addEventListener('click', () => {
            setupGame();
            stopTimer();
            startTimer();
        });

        hintBtn.addEventListener('click', useHint);

        setupGame();