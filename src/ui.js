import {} from "./createGameModal.js";
import * as utils from "./utils.js";
import * as reviewCard from "./reviewCard.js";

const container = document.querySelector(".grid") ?? console.error("grid not found");
const orderByElement = document.querySelector("select");


orderByElement.addEventListener("change", (e) => {
    const selection = e.target.value;

    document.dispatchEvent(new CustomEvent("onorderchanged", {
        detail: {
            order: selection
        }
    }));
});

let gameCardElements = [];

export function populateUI(games){
    container.innerHTML = ``;
    gameCardElements = [];

    games.forEach(game => {
        const card = reviewCard.createCard(game);
        gameCardElements.push(card);
    });
    renderCards();
    // games.sort((a,b) => a.playtime - b.playtime);
}



function renderCards(){
    gameCardElements.forEach(x => {
        container.appendChild(x);
    });
}

