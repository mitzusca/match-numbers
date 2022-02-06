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

        setTimeout(()=>{
            this.mixCards();
            this.countDown = this.startCountDown();
            this.busy = false
        },500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }
    showCard(card) {
        if(this.canShowCard(card)){
            //it makes count the number of click's
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            //code for mathcing cards
            if(this.cardToCheck)
                this.checkForCardMatch(card);
            else
                this.cardToCheck = card
        }
    }
    //code to check the cards
    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else
            this.cardMisMatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }
    //code if cards are matched
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if(this.matchedCards.length === this.cardsArray.length)
            this.wellDone();
    }
    //code if cards does not match
    cardMisMatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
          card1.classList.remove('visible'); 
          card2.classList.remove('visible'); 
          this.busy = false;
        }, 1000);
    }
    // it will get src location as a string 
    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;
    }
    //code for time remaining
    startCountDown() {
        return setInterval(() => {
           this.timeRemaining--;
           this.timer.innerText = this.timeRemaining;
           if(this.timeRemaining === 0)
              this.gameOver();        
        }, 1000);
    }
    //code to show GAME OVER overlay when TIME reach 0
    gameOver() {
        clearInterval(this.countDown);
        document.getElementById('game-over').classList.add('visible');
    }
    //code to show Well Done text when you finnish the game
    wellDone() {
        clearInterval(this.countDown);
        document.getElementById('done').classList.add('visible');
    }
    //code to mix the cards every new game
    mixCards() {
        //Fisher–Yates shuffle algorithm https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
        for(let i = this.cardsArray.length -1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randomIndex].style.order = i;
            this.cardsArray[i].style.order = randomIndex;
        }
    }
    canShowCard(card) {
        //if the following code it will be true then it will show the card
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck
    }
}
