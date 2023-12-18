import checkWin from "./checkWin.js";
import { selector } from "./selector.js";

const game = selector("#game");

const arrayPics = [
  "/imgs/img-API.png",
  "/imgs/img-Bootstrap.png",
  "/imgs/img-CSS.png",
  "/imgs/img-HTML.png",
  "/imgs/img-React.png",
  "/imgs/img-SASS.png",
];
const frontPic = ["/imgs/javascript.png"];

const fullArray = [...arrayPics,...arrayPics];

let arrWin = [];

function createCard(fullArray) {
  fullArray.forEach((ele) => {
    game.innerHTML += `<div style="cursor: pointer;" class="text-center card_class d-flex justify-content-center align-items-center"><img class=" backImg" src="${ele}" alt="img"><img class="text-center frontImg" src="${frontPic}" alt="img"></div>`;
  });
}
let numberOfCards = 0;

game.addEventListener("click", (e) => {
  let clickConteiner =
    e.target.src != undefined ? e.target.parentElement : e.target;
  /* console.log(clickConteiner); */
  let clickIt =
    e.target.src != undefined ? e.target.previousElementSibling : e.target.firstChild;
    console.log(clickIt);
  if (!clickIt.classList.contains("win")) {
    arrWin.push(clickConteiner);
    clickConteiner.classList.toggle("flip");
    if (arrWin.length === 2) {
      if (checkWin(arrWin)) {
        numberOfCards++
        fullArray.length / 2 == numberOfCards && alert("You Win!")
        arrWin.forEach((sel) => {
          sel.firstChild.classList.add("win");
        });
        arrWin = [];
      } else {
        setTimeout(() => {
          arrWin.forEach((sel) => {
            sel.classList.remove('flip')
            
          });
          arrWin = [];
          
        }, 1000);
        console.log("-------");
      }
      
    }
    console.log(numberOfCards);
  }
});

const restartGame = () => {
  numberOfCards = 0;
  game.innerHTML = "";
  fullArray.sort(() => Math.random() - 0.5);
  return createCard(fullArray);
  ;
};
selector("#btn").addEventListener("click", restartGame)
console.log(fullArray);
restartGame();
