//it waits for the page to load before loading the code
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}
function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay'));
    let cards = Array.from(document.getElementsByClassName('card'));
//when click on 'Click to start!' overlay-text should dissapear
    overlays.forEach(overlay => {
       overlay.addEventListener('click', () => {
           overlay.classList.remove('visible'); 
       });
    });
}