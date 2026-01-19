let deckId;
let cardsInPlay = [];

const drawTwoBtn = document.getElementById('draw-two');

document.getElementById('new-deck').addEventListener('click', handleClick)
drawTwoBtn.addEventListener('click', drawTwo)

function handleClick() {
  fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then(res => res.json())
    .then(data => {
      deckId = data.deck_id
      cardsInPlay = drawTwo()
      return cardsInPlay
    })
    .then(() => drawTwoBtn.classList.remove('hidden'))
}

function drawTwo() {
  return fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw?count=2`)
    .then(res => res.json())
    .then(data => {
      cardsInPlay = data.cards
      document.getElementById('player-1').innerHTML = `
        <p class="new-card-code">${cardsInPlay[0].code}</p>
        <img src="${cardsInPlay[0].image}" />
        `

      document.getElementById('player-2').innerHTML = `
        <p class="new-card-code">${cardsInPlay[1].code}</p>
        <img src="${cardsInPlay[1].image}" />
        `
    })
  }
