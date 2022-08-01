const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win'),
    winMusic: document.querySelector('#winMusic'),
    bgrMusic: document.querySelector('#bgrMusic'),
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}

function shuffle(array) {
    let clonedArray = [...array]
    clonedArray.sort(() => 0.5 - Math.random())
    return clonedArray
}

function pickRandom(array, items) {
    let clonedArray = [...array]
    let randomPicks = []

    for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)

        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }
    return randomPicks
}

function generateGame() {
    let dimensions = localStorage.getItem("dimension");
    if (dimensions % 2 !== 0) {
        console.log("The dimension of the board must be an even number.")
    }
    let emojis = ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍍', '🍑', '🍓', '🍞', '🥐', '🥥', '🥦', '🥜', '🍄', '🥞', '🧇', '🧀', '🥚',
        '🍿', '🥗', '🍝', '🍣', '🍦', '🍧', '🍩', '🍰', '🥧', '🍫', '🍭', '🍺']
    let picks = pickRandom(emojis, (dimensions * dimensions) / 2)
    let items = shuffle([...picks, ...picks])
    let cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${item}</div>
                </div>
            `).join('')}
       </div>
    `

    const parser = new DOMParser().parseFromString(cards, 'text/html')

    selectors.board.replaceWith(parser.querySelector('.board'))
}

function startGame() {

    state.gameStarted = true
    selectors.start.classList.add('disabled')
    selectors.bgrMusic.play()
    state.loop = setInterval(() => {
        state.totalTime++

        selectors.moves.innerHTML = `${state.totalFlips} moves`
        selectors.timer.innerHTML = `time: ${state.totalTime} sec`
    }, 1000)
}

function flipBackCards() {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}

function flipCard(card) {
    state.flippedCards++
    state.totalFlips++

    if (!state.gameStarted) {
        startGame()
    }

    if (state.flippedCards <= 2) {
        card.classList.add('flipped')
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')

        if (flippedCards[0].innerText === flippedCards[1].innerText) {
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')
        }

        setTimeout(() => {
            flipBackCards()
        }, 800)
    }

    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        selectors.bgrMusic.pause()
        selectors.winMusic.play()
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped')
            selectors.win.innerHTML = `
                <span class="win-text">
                    You won!<br />
                    with <span class="highlight">${state.totalFlips}</span> moves<br />
                    under <span class="highlight">${state.totalTime}</span> seconds
                </span>
            `

            clearInterval(state.loop)
        }, 1000)
    }
}

function attachEventListeners() {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent)
        } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
            startGame()
        }
    })
}


generateGame()
attachEventListeners()