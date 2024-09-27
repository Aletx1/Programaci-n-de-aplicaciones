const totalCards = 12; 
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;
let pairsFound = 0;

const totalPairs = totalCards / 2; // Número total de pares
const imageFolder = 'imagenes/'; // Carpeta donde están las imágenes
const imagePaths = [
    "C:/Users/palo-/Desktop/uni/progra aplicaciones/lab/guess the card/imagenes/primera.jpg",
    "C:/Users/palo-/Desktop/uni/progra aplicaciones/lab/guess the card/imagenes/segunda.jpg",
    "C:/Users/palo-/Desktop/uni/progra aplicaciones/lab/guess the card/imagenes/tercera.jpg",
    "C:/Users/palo-/Desktop/uni/progra aplicaciones/lab/guess the card/imagenes/cuarta.jpg",
    "C:/Users/palo-/Desktop/uni/progra aplicaciones/lab/guess the card/imagenes/quinta.jpg",
    "C:/Users/palo-/Desktop/uni/progra aplicaciones/lab/guess the card/imagenes/sexta.jpg"
]; // Array para almacenar las rutas de las imágenes

let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';

function activate(e) {
   if (currentMove < 2) {
      
      if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')) {
         e.target.classList.add('active');
         selectedCards.push(e.target);

         if (++currentMove == 2) {
            currentAttempts++;
            document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';

            const img1 = selectedCards[0].querySelector('.face img').src;
            const img2 = selectedCards[1].querySelector('.face img').src;

            if (img1 === img2) {
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
   let rnd = Math.floor(Math.random() * (totalCards * 0.5));
   let values = valuesUsed.filter(value => value === rnd);
   if (values.length < 2) {
      valuesUsed.push(rnd);
   } else {
      randomValue();
   }
}

function loadImages() {
   for (let i = 1; i <= totalPairs; i++) {
      imagePaths.push(`${imageFolder}image${i}.jpg`); // Carga las imágenes con nombres como 'image1.jpg', 'image2.jpg', etc.
   }
}

function assignImagesToCards() {
   valuesUsed.forEach((value, index) => {
      const imgElement = document.createElement('img');
      imgElement.src = imagePaths[value];
      cards[index].querySelector('.face').appendChild(imgElement); // Asigna la imagen correspondiente
   });
}

// Carga las imágenes
loadImages();

for (let i = 0; i < totalCards; i++) {
   let div = document.createElement('div');
   div.innerHTML = cardTemplate;
   cards.push(div);
   document.querySelector('#game').append(cards[i]);
   randomValue();
   cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
}

// Asigna las imágenes a las cartas después de haber generado los valores
assignImagesToCards();

function showPopup() {
   const popup = document.getElementById('popup');
   popup.style.display = 'block';

   document.getElementById('restartButton').addEventListener('click', () => {
      window.location.reload(); // Reinicia la página
   });
}
