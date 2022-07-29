class element {
    name;
    img;

    constructor(name, img) {
        this.name = name;
        this.img = img
    }
}

let obj1 = new element('fries', 'images/fries.png')
let obj2 = new element('cheeseburger', 'images/cheeseburger.png')
let obj3 = new element('hotdog', 'images/hotdog.png')
let obj4 = new element('ice-cream', 'images/ice-cream.png')
let obj5 = new element('milkshake', 'images/milkshake.png')
let obj6 = new element('pizza', 'images/pizza.png')
let obj7 = new element('cake', 'images/cake.png')
let obj8 = new element('custard', 'images/custard.png')

let cardArray = [obj1, obj2, obj3, obj4, obj5, obj6, obj7, obj8, obj1, obj2, obj3, obj4, obj5, obj6, obj7, obj8]
cardArray.sort(() => 0.5 - Math.random())
const gridDisplay = document.querySelector('#grid')
let cardsChosen = [];
let cardsChosenIds = [];
let cardsWon = [];
let result = document.querySelector('#result')

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gridDisplay.appendChild(card)
    }

}

createBoard()

function checkMatch() {
    const cards = document.querySelectorAll('img')
    if (cardsChosen[0] == cardsChosen[1]) {
        if (cardsChosenIds[0] == cardsChosenIds[1]) {
            cards[cardsChosenIds[0]].setAttribute('src', 'images/blank.png')
            cards[cardsChosenIds[1]].setAttribute('src', 'images/blank.png')
            alert('You have clicked the same card')
        } else {
            cards[cardsChosenIds[0]].setAttribute('src', 'images/white.png')
            cards[cardsChosenIds[1]].setAttribute('src', 'images/white.png')
            cards[cardsChosenIds[0]].removeEventListener('click', flipCard)
            cards[cardsChosenIds[1]].removeEventListener('click', flipCard)
            cardsWon.push(cardsChosen)
        }
    } else {
        cards[cardsChosenIds[0]].setAttribute('src', 'images/blank.png')
        cards[cardsChosenIds[1]].setAttribute('src', 'images/blank.png')
    }
    result.innerHTML = cardsWon.length;
    cardsChosen = [];
    cardsChosenIds = [];

    if (cardsWon.length == cardArray.length / 2) {
        result.innerHTML = 'Congratulation! You have found them all'
    }
}

function flipCard() {
    const cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500)
    }

}
