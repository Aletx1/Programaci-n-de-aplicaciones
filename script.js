const totalCards = 12;
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;
let pairsFound = 0;

let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';
const totalPairs = totalCards / 2; // Número total de pares

function activate(e) {
   if (currentMove < 2) {
      
      if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')) {
         e.target.classList.add('active');
         selectedCards.push(e.target);

         if (++currentMove == 2) {
            currentAttempts++;
            document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';

            if (selectedCards[0].querySelectorAll('.face')[0].innerHTML == selectedCards[1].querySelectorAll('.face')[0].innerHTML) {
               selectedCards = [];
               currentMove = 0;
               pairsFound++;
               // Verifica si se han encontrado todos los pares
               if (pairsFound === totalPairs) {
                  showPopup(); // Muestra el popup cuando se gana
               }
            } else {
               setTimeout(() => {
                  selectedCards[0].classList.remove('active');
                  selectedCards[1].classList.remove('active');
                  selectedCards = [];
                  currentMove = 0;
               }, 600);
            }
         }
      }
   }
}

function randomValue() {
   let rnd = Math.floor(Math.random() * totalCards * 0.5);
   let values = valuesUsed.filter(value => value === rnd);
   if (values.length < 2) {
      valuesUsed.push(rnd);
   } else {
      randomValue();
   }
}

for (let i = 0; i < totalCards; i++) {
   let div = document.createElement('div');
   div.innerHTML = cardTemplate;
   cards.push(div);
   document.querySelector('#game').append(cards[i]);
   randomValue();
   cards[i].querySelectorAll('.face')[0].innerHTML = valuesUsed[i];
   cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
}

function showPopup() {
   const popup = document.getElementById('popup');
   popup.style.display = 'block';

   document.getElementById('restartButton').addEventListener('click', () => {
      window.location.reload(); // Reinicia la página
   });
}
