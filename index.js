const navWrapper = document.getElementById('nav-wrapper')
const cardImages = document.getElementsByClassName('card-image')
const newDeck = document.getElementById('new-deck')
const drawTwoBtn = document.getElementById('draw-two');
const roundWinner = document.getElementById('round-winner')
const remainingCards = document.getElementById('remaining-cards')
const buttonWrapper = document.getElementById('button-wrapper')

let deckId;
let remainingCount;
let cardsInPlay = [];

newDeck.addEventListener('click', handleClick)
drawTwoBtn.addEventListener('click', drawTwo)

function handleClick() {
  newDeckReset()
  fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then(res => res.json())
    .then(data => {
      deckId = data.deck_id
    })
    .then(() => {
      navWrapper.appendChild(newDeck)
      newDeck.innerText = "New Deck"
      drawTwoBtn.classList.remove('hidden')
      drawTwoBtn.classList.add('fancy-yellow')
      newDeck.classList.remove('fancy-yellow')
      roundWinner.classList.remove('click-start')
    })
}

function drawTwo() {
  drawTwoBtn.classList.remove('fancy-yellow')

  return fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw?count=2`)
    .then(res => res.json())
    .then(data => {
      remainingCount = data.remaining
      cardsInPlay = data.cards

      document.querySelectorAll('.card-image').forEach((instance, i) => {
        instance.src = `${cardsInPlay[i].image}`
      })
      roundWinner.innerHTML = getWinningCard(cardsInPlay[0], cardsInPlay[1])
      remainingCards.innerText = `remaining: ${remainingCount}`
      if (remainingCount === 48) {
        buttonWrapper.appendChild(newDeck)
        roundWinner.innerHTML += '<br><span class="game-over">Game over!</span>'
        drawTwoBtn.classList.add('game-over')
        newDeck.classList.add('fancy-yellow')
        newDeck.innerText = 'start new game'
        drawTwoBtn.disabled = true
      }
    })
}

function getWinningCard(card1, card2) {
  const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]

  const cardOneValueIndex = cardValues.indexOf(card1.value)
  const cardTwoValueIndex = cardValues.indexOf(card2.value)

  if (cardOneValueIndex > cardTwoValueIndex) {
    return `human wins!`
  }
  else if (cardTwoValueIndex > cardOneValueIndex) {
    return `machine wins!`
  }
  else {
    return `Its a war!`
  }
}

function newDeckReset() {
  for (let i = 0; i < cardImages.length; i++) {
    cardImages[i].src = 'img/card_back.png'
    cardImages[i].removeAttribute('hidden')
  }
  roundWinner.classList.remove('game-over')
  drawTwoBtn.classList.remove('game-over')
  drawTwoBtn.disabled = false;
  roundWinner.innerHTML = "a new game has begun!<br>click below to draw.";
  remainingCount = 52
  remainingCards.innerText = 'remaining: 52'
}
