let deckId;
let cardsInPlay = [];

const newDeck = document.getElementById('new-deck')
const drawTwoBtn = document.getElementById('draw-two');

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
      document.getElementById('players-wrapper').classList.remove('hidden')
      newDeck.innerText = "New Deck"
    .then(() => drawTwoBtn.classList.remove('hidden'))
    })
}

function drawTwo() {
  return fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw?count=2`)
    .then(res => res.json())
    .then(data => {
      cardsInPlay = data.cards
      if (!(document.querySelector('.card-image'))) {
        document.querySelectorAll('.player').forEach((instance, i) => {
          let imageEl = document.createElement('img')
          imageEl.src = `${cardsInPlay[i].image}`
          imageEl.classList.add('card-image')
          instance.appendChild(imageEl)
        })
      }
      else {
        document.querySelectorAll('.card-image').forEach((instance, i) => {
          instance.src = `${cardsInPlay[i].image}`
        })
      }
    })
}
