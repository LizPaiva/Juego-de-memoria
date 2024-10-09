const images = [
    'assets/20220710_070902.jpg', 
    'assets/IMG-20240416-WA0017.jpg', 
    'assets/IMG-20240416-WA0019.jpg', 
    'assets/Screenshot_20221016-200700.jpg',
    'assets/20220710_070902.jpg', 
    'assets/IMG-20240416-WA0017.jpg', 
    'assets/IMG-20240416-WA0019.jpg', 
    'assets/Screenshot_20221016-200700.jpg'
];

let cardValues = [];
let cardIds = [];
let matchedCards = [];
const gameBoard = document.getElementById('game-board');

// Mezcla las imágenes
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function createBoard() {
    const shuffledImages = shuffle(images);
    for (let i = 0; i < shuffledImages.length; i++) {
        const card = document.createElement('div');
        card.setAttribute('data-id', i);
        card.classList.add('card');
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    }
}


function flipCard() {
    const card = this;
    const cardId = card.getAttribute('data-id');
    
   
    const img = document.createElement('img');
    img.src = images[cardId];
    img.style.width = '100%'; 
    img.style.height = '100%'; 
    card.innerHTML = ''; 
    card.appendChild(img); 
    card.classList.add('flipped');
    
    cardValues.push(images[cardId]);
    cardIds.push(cardId);
    
    if (cardValues.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

const errorImageSrc = 'assets/error.png';
const errorContainer = document.getElementById('error-container');


function checkMatch() {
    const cards = document.querySelectorAll('.card');
    const [firstCardId, secondCardId] = cardIds;
    
    if (cardValues[0] === cardValues[1] && firstCardId !== secondCardId) {
        matchedCards.push(cardValues);
    } else {
        const errorImage = document.createElement('img');
        errorImage.src = errorImageSrc;
        errorImage.style.width = '180px';
        errorImage.style.height = '180px';
        errorContainer.innerHTML = ''; 
        errorContainer.appendChild(errorImage); 

        setTimeout(() => {
            cards[firstCardId].innerHTML = ''; 
            cards[secondCardId].innerHTML = ''; 
            cards[firstCardId].classList.remove('flipped');
            cards[secondCardId].classList.remove('flipped');
            errorContainer.innerHTML = ''; 
        }, 1000);
    }
    
    cardValues = [];
    cardIds = [];
    
    if (matchedCards.length === images.length / 2) {
        alert('¡Felicidades! 🎊🎉🎈😊 Has encontrado todos los pares.');
    }
}

createBoard();