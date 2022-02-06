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