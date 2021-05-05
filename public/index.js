let clickedCards
let lifeCounter = 2
startGame()

let cards = document.querySelectorAll('.card')
let buttonRestart = document.querySelectorAll('.button--restart')

settingEvents()

function startGame() {
  const cardContainer = document.querySelector('#card-container')

  while (cardContainer.firstChild) {
    cardContainer.firstChild.remove()
  }

  const defaultArray = ["red", "red", "yellow", "yellow", "lightblue", "lightblue", "green", "green"]

  const shuffleArray = shuffleElements(defaultArray)

  renderCards(shuffleArray)

  function shuffleElements(array) {
    const shuffleArray = []
  
    for ( let i = 0; i < 8; i++ ) {
      const randomNumber = Math.floor(Math.random() * array.length)
      shuffleArray.push(array[randomNumber])
  
      array.splice(randomNumber, 1)
    }
  
    return shuffleArray
  }

  function renderCards(Itens) {
    for ( const Item of Itens ) {
      const newCard = document.createElement('div')
      newCard.className = "card"

      const cardInner = document.createElement('div')
      cardInner.className = "card-inner"

      const cardFront = document.createElement('div')
      cardFront.className = "card-front"

      const cardBack = document.createElement('div')
      cardBack.className = "card-back"
      cardBack.style.backgroundColor = Item

      cardInner.append(cardFront, cardBack)
      newCard.appendChild(cardInner)
      cardContainer.appendChild(newCard)

    }
  }
}

function flipCard() {
  clickedCards = document.querySelectorAll('.card.clicked.unsolved')

  if (clickedCards.length < 2 ) {
    this.classList.add('clicked')
    this.classList.add('unsolved')

    clickedCards = document.querySelectorAll('.card.clicked.unsolved')

    cards.forEach(card => card.removeEventListener('click', flipCard))

    setTimeout(() => {
      isEqual(clickedCards)
      cards.forEach(card => card.addEventListener('click', flipCard))
    }, 1000)
  }
}

function isEqual(Cards) {
  if ( Cards.length == 2 ) {
    cardOne = Cards[0].childNodes[0].childNodes[1].style.backgroundColor
    cardTwo = Cards[1].childNodes[0].childNodes[1].style.backgroundColor

    if( cardOne === cardTwo ) {
      Cards.forEach(card => {
        card.classList.add('solved')
        card.classList.remove('unsolved')
        card.removeEventListener('click', flipCard)
      });

      Win()
    }
    else {
      Cards.forEach(card => {
        card.classList.remove('clicked')
      })

      Lose()
    }
  }
}

function Win() {
  const solvedCards = document.querySelectorAll('.card.solved')

  if ( solvedCards.length === 8 ) {
    const modalWin = document.querySelector('.modal--win')
    modalWin.classList.add('activated')
  }
}

function Lose() {
  lifeCounter -= 1
  renderLife()

  if ( lifeCounter <= 0 ) {
    cards.forEach(card => {
      card.classList.remove('solved')
      card.classList.remove('unsolved')
      card.classList.remove('clicked')
    })
    
    const modalLose = document.querySelector('.modal--lose')
    modalLose.classList.add('activated')
  }
}

function renderLife() {
  const lifeContainer = document.querySelector('.life-container')
  lifeContainer.innerHTML = `Life - ${lifeCounter}`
}

function Restart() {
  const modals = document.querySelectorAll('.modal')
  modals.forEach(modal => modal.classList.remove('activated'))

  lifeCounter = 2
  renderLife()

  startGame()
  settingEvents()
}

function settingEvents() {
  cards = document.querySelectorAll('.card')
  buttonRestart = document.querySelectorAll('.button--restart')
  
  cards.forEach(card => card.addEventListener('click', flipCard))
  buttonRestart.forEach(button => button.addEventListener('click', Restart))

}