const player_0 = document.querySelector('.player-0');
const player_1 = document.querySelector('.player-1');
const score_0 = document.querySelector('#score-0');
const score_1 = document.querySelector('#score-1');
const current_0 = document.querySelector('#current-0');
const current_1 = document.querySelector('#current-1');


const dice_p = document.querySelector('.dice');
const newbtn = document.querySelector('.btn-new');
const rollbtn = document.querySelector('.btn-roll');
const holdbtn = document.querySelector('.btn-hold');
const helpbtn = document.querySelector('.btn-help');
const closemodal = document.querySelector('.btn-close');

let currentscore, activeplayer, playing, scores,runner;



function init() {
    scores = [0, 0];
    currentscore = 0;
    activeplayer = 0;
    playing = true;

    score_0.textContent = 0;
    score_1.textContent = 0;
    current_0.textContent = 0;
    current_1.textContent = 0;

    dice_p.classList.add('hidden');
    player_0.classList.remove('player-winner');
    player_1.classList.remove('player-winner');
    player_0.classList.remove('player-loser');
    player_1.classList.remove('player-loser');
    player_0.classList.add('player-active')
    player_1.classList.remove('player-active');
    document.querySelector('#name-0').textContent = 'Human';
    document.querySelector('#name-1').textContent = 'computer';
}
init();

function computer() {
    const dice = parseInt((Math.random() * 7));
    if (dice == 0) {
        dice_p.src = 'asset/img/dice-0.jpg';
        scores[1] += currentscore;
        document.querySelector('#score-1').textContent = scores[1];
        switchplayer();
        if(scores[1] >= 100){
            playing = false;
            dice_p.classList.add('hidden');
            document.querySelector('.player-1').classList.add('player-winner');
            document.querySelector('#name-1').textContent = 'ComputerWINNER';
            document.querySelector('.player-0').classList.add('player-loser');
            document.querySelector('#name-0').textContent = 'Youloser';
            clearInterval(runner);
        }else{
            clearInterval(runner);
        }
    } else {
        dice_p.classList.remove('hidden');
        currentscore += dice;
        document.querySelector(`#current-${activeplayer}`).textContent = currentscore;
        dice_p.src = `asset/img/dice-${dice}.png`;
    }
}

function switchplayer() {
    document.querySelector(`#current-${activeplayer}`).textContent = 0;
    currentscore = 0;
    activeplayer = activeplayer === 0 ? 1 : 0;
    if (activeplayer == 1) {
        rollbtn.classList.add('hidden');
        holdbtn.classList.add('hidden');
        runner = setInterval(computer,1000);
    }else{
        rollbtn.classList.remove('hidden');
        holdbtn.classList.remove('hidden');
    }
    player_0.classList.toggle('player-active');
    player_1.classList.toggle('player-active');
}



rollbtn.addEventListener('click', function () {
    if (playing) {
        const dice = parseInt((Math.random() * 7));
        dice_p.classList.remove('hidden');
        dice_p.src = `asset/img/dice-${dice}.png`;
        if (dice != 0) {
            currentscore += dice;
            document.querySelector(`#current-${activeplayer}`).textContent = currentscore;
        } else {
            dice_p.src = 'asset/img/dice-0.jpg';
            switchplayer();
        }
    }
})



holdbtn.addEventListener('click', function () {
    if (playing) {
        scores[0] += currentscore;
        document.querySelector('#score-0').textContent = scores[0];
        if (scores[0] >= 100) {
            playing = false;
            dice_p.classList.add('hidden');
            document.querySelector('.player-0').classList.add('player-winner');
            document.querySelector('#name-0').textContent = 'YOUWINNER';
            if (activeplayer != 0) {
                document.querySelector('.player-0').classList.add('player-loser');
                document.querySelector('#name-0').textContent = 'YOULOSER'

            } else {
                document.querySelector('.player-1').classList.add('player-loser');
                document.querySelector('#name-1').textContent = 'computerloser'
            }
            document.querySelector(`player-${activeplayer}`).classList.remove('player-active');
        } else {
            switchplayer();
        }

    }
    clearInterval(intervalID);
})



helpbtn.addEventListener('click', function () {
    document.querySelector('main').classList.add('blur');
    document.querySelector('#modal').classList.add('open');
    closemodal.textContent = 'close'
})


closemodal.addEventListener('click', function () {
    let test = 0;
    document.querySelector('#modal').classList.remove('open');
    document.querySelector('main').classList.remove('blur');
    closemodal.textContent = 'ready !!!'
})
newbtn.addEventListener('click', init);