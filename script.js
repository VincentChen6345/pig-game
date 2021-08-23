'use strict';

let diceRoll = function () {
  Math.trunc(Math.random() * 6) + 1;
};

//selecting elements
const score1El = document.querySelector('#score--1');
const score0El = document.querySelector('#score--0');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//initial conditions

let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score1El.textContent = 0;
  score0El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);
    //diceEl.textContent = dice;

    //2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    console.log(dice);
    //3. Check for rolled 1:
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      //sets the score to the current ACTIVE PLAYER by building the ID name dynamically
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//Hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to active player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if player's score is >=100;
    if (scores[activePlayer] >= 100) {
      playing = false;
      //finish the game-declare winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      //finish the game- remove all active players
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      //remove dice image

      diceEl.classList.add('hidden');
      document.querySelector(`#current--${activePlayer}`).textContent =
        'WINNER!';
    } else {
      //switch to the next player

      switchPlayer();
    }
  }
});

//NEW GAME BUTTON- RESET THE GAME
btnNew.addEventListener('click', init);
