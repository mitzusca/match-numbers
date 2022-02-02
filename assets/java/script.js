class MatchNumbers {
    //game objects that are created when new game is created
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('clicks');
    }
    //it create an new game
    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
    }
    showCard(card) {
        if(this.canShowCard(card)){
            //it makes count the number of click's
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');
        }
    }
    canShowCard(card) {
        return true;
        //if the following code it will be true then it will show the card
        //return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck
    }
}
function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MatchNumbers(100, cards);
//when click on 'Click to start!' overlay-text should dissapear
    overlays.forEach(overlay => {
       overlay.addEventListener('click', () => {
           overlay.classList.remove('visible'); 
           game.startGame();
       });
    });
    cards.forEach(card =>{
        card.addEventListener('click', () => {
            game.showCard(card);
        });
    });
}
//it waits for the page to load before loading the code
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}