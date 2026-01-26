const newDeck = document.getElementById('new-deck')
const drawTwoBtn = document.getElementById('draw-two');
const roundWinner = document.getElementById('round-winner')
const playersWrapper = document.getElementById('players-wrapper')

let deckId;
let cardsInPlay = [];
newDeck.addEventListener('click', handleClick)
drawTwoBtn.addEventListener('click', drawTwo)

function handleClick() {
  fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then(res => res.json())
    .then(data => {
      deckId = data.deck_id
      cardsInPlay = drawTwo()
      return cardsInPlay
    })
    .then(() => {
      drawTwoBtn.classList.remove('hidden')
      playersWrapper.classList.remove('hidden')
      newDeck.innerText = "New Deck"
    })
}

function drawTwo() {
  return fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw?count=2`)
    .then(res => res.json())
    .then(data => {
      cardsInPlay = data.cards

      document.querySelectorAll('.card-image').forEach((instance, i) => {
        instance.src = `${cardsInPlay[i].image}`
        instance.removeAttribute('hidden')
      })
      roundWinner.innerText = getWinningCard(cardsInPlay[0], cardsInPlay[1])
      roundWinner.removeAttribute('hidden')
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
