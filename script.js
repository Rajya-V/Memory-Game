const cards = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

let flippedCards = []; // To track flipped cards

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const gameContainer = document.querySelector('.game-container');
    shuffle(cards);
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.card = card;
        cardElement.innerText = '';  // No text initially
        gameContainer.appendChild(cardElement);
    });
}

function flipCard(event) {
    const clickedCard = event.target;

    // Ensure you can only flip cards that are not already flipped or matched
    if (clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
        return;
    }

    clickedCard.classList.add('flipped');  // Flip the clicked card
    clickedCard.innerText = clickedCard.dataset.card;  // Display the card's content

    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
        const [firstCard, secondCard] = flippedCards;

        if (firstCard.dataset.card === secondCard.dataset.card) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
        } else {
            // If cards don't match, flip them back after a short delay
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                firstCard.innerText = '';
                secondCard.innerText = '';
            }, 1000);
        }

        flippedCards = [];  // Reset the flipped cards
    }
}

document.querySelector('.game-container').addEventListener('click', flipCard);

createBoard();
