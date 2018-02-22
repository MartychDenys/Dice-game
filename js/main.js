var scores, roundScore, activePlayer, dice, dice2, gamePlaying, counterSteps, finalScore;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;
counterSteps = 0;
finalScore = 100;


init();

var roleDice = document.querySelector('.btn-roll');
roleDice.addEventListener('click', function(){

    if(gamePlaying ){
        counterSteps++;

        // 1. Random number
        dice = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.getElementById('dice-1');
        diceDOM.style.display = 'block';
        diceDOM.src = 'img/dice-' + dice + '.png';

        var diceDOM2 = document.getElementById('dice-2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'img/dice-' + dice2 + '.png';
        //3. Update the roundScore IF the rolled number was NOT a 1

        if(dice === 6 && dice2 === 6){
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        }else if(dice !== 1 && dice2 !== 1){
            roundScore += dice + dice2;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }else{
            nextPlayer();
        }
    }

});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.dice').style.display = 'none';
    //document.getElementById('dice-2').style.display = 'none';
}

var hold = document.querySelector('.btn-hold');
hold.addEventListener('click', function(){
    if(gamePlaying){
        //Add Current score to Global score
        scores[activePlayer] += roundScore;

        var input = document.getElementById('final-score').value;
        var finalScore;

        if(input){
            finalScore = input;
        }else{
            finalScore = 100;
        }
        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if(scores[activePlayer] >= finalScore){
            document.querySelector('#name-' + activePlayer).innerHTML = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else{
            // Next player
            nextPlayer();
        }
    }



});

var newGame = document.querySelector('.btn-new');
newGame.addEventListener('click', init);

function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player1';
    document.getElementById('name-1').textContent = 'Player2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}