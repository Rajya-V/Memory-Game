const cards = [
    '*','*','#','#','@','@','&','&','!','!','$','$','^','^','~','~'
];

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
        gameContainer.appendChild(cardElement);
    });
}

function flipCard(event) {
    event.preventDefault();
    const clickedCard = event.target;
    clickedCard.classList.add('flipped');
    if (document.querySelector('.flipped')) {
        const firstCard = document.querySelector('.flipped');
        const secondCard = clickedCard;
        if (firstCard.dataset.card === secondCard.dataset.card) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
            }, 1000);
        }
    }
}

document.querySelector('.game-container').addEventListener('click', flipCard);

createBoard();
