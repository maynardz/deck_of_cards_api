let getDeck = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
let deckId;
let playerOne;
let playerTwo;

let jack = 11;
let queen = 12;
let king = 13;
let ace = 14;

const newDeck = document.querySelector('#startButton');
newDeck.addEventListener('click', getNewDeck);

const draw = document.querySelector('#drawButton');
draw.addEventListener('click', drawFromPile);

const displayDiv = document.querySelector('#displayResults');

// FETCH A NEW DECK
function getNewDeck() {
    fetch(getDeck)
        .then(result => {
            return result.json();
        })
        .then(json => {
            console.log(json);
            drawCards(json);

        })
}

// DRAW ALL 52 CARDS
function drawCards(json) {
    deckId = json.deck_id;
    // console.log(deckId);

    drawCards = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`;

    fetch(drawCards)
        .then(result => {
            return result.json();
        })
        .then(json => {
            console.log(json);
            playerOnePile(json);
            playerTwoPile(json);
        })
}

// GRAB EVEN INDEXES AND ADD THEM TO PLAYER ONE PILE
function playerOnePile(json) {

    let playerOneArr = [];

    for (let i = 0; i < json.cards.length; i++) {
        if (i % 2 == 0) {
            playerOneArr.push(json.cards[i].code);
        }
    }
    console.log(playerOneArr);

    playerOne = `https://deckofcardsapi.com/api/deck/${deckId}/pile/playerOnePile/add/?cards=${playerOneArr.join()}`;

    fetch(playerOne)
        .then(result => {
            return result.json();
        })
        .then(pileOneData => {
            console.log(pileOneData);
        })
}

// GRAB ODD INDEXES AND ADD THEM TO PLAYER TWO PILE
function playerTwoPile(json) {

    let playerTwoArr = [];

    for (let i = 0; i < json.cards.length; i++) {
        if (i % 2 == 1) {
            playerTwoArr.push(json.cards[i].code);
        }
    }
    console.log(playerTwoArr);

    playerTwo = `https://deckofcardsapi.com/api/deck/${deckId}/pile/playerTwoPile/add/?cards=${playerTwoArr.join()}`;

    fetch(playerTwo)
        .then(result => {
            return result.json()
        })
        .then(pileTwoData => {
            console.log(pileTwoData);
        })
}

// DRAW A CARD FOR EACH PLAYER FROM EACH PILE
function drawFromPile() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/pile/playerOnePile/draw/?count=1`)
        .then(response => {
            return response.json();
        })
        .then(json => {
            console.log(json);
            displayPlayerOneResults(json);
        })

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/pile/playerTwoPile/draw/?count=1`)
        .then(response => {
            return response.json()
        })
        .then(json => {
            console.log(json);
            displayPlayerTwoResults(json);
        })
}

// DISPLAY RESULTS
function displayPlayerOneResults(json) {
    console.log(json.cards[0].images);

    let img = document.createElement('img');
    img.src = json.cards[0].images.png;

    displayDiv.appendChild(img);

    let p1value = json.cards[0].value;
    // console.log(p1value);
    checker(p1value);
}

function displayPlayerTwoResults(json) {
    console.log(json.cards[0].images)

    let img = document.createElement('img');
    img.src = json.cards[0].images.png;

    displayDiv.appendChild(img);

    let p2value = json.cards[0].value;
    // console.log(p2value);
    checker(p2value);
}

function checker(p1value, p2value) {
    console.log(p1value);
    console.log(p2value);
}


//highlight around winners card
//add losers card to your pile
//when one players pile is empty, annouce winner