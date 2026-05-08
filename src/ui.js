import {} from "./createReviewModal.js";
import * as utils from "./utils.js";
import * as reviewCard from "./reviewCard.js";
import * as db from "./dataAccess.js";

//grid container
const container = document.querySelector(".grid") ?? console.error("grid not found");

//sorting element
const sortByElement = document.querySelector("select");

//delete all button
const deleteAllBtn = document.querySelector("#delete-all-btn");


//tell the system that the sorting has changed
sortByElement.addEventListener("change", (e) => {
    const selection = e.target.value;

    document.dispatchEvent(new CustomEvent("onsortchanged", {
        detail: {
            sorting: selection
        }
    }));
});

//handle deleting all reviews and re-rendering
deleteAllBtn.addEventListener("click", () => {
    const promptResult = confirm("are you sure?");

    if(promptResult){
        db.removeAllItems();
        //render empty UI
        renderUI([]);
    }
});

//review cards to be rendered
let reviewElements = [];


//renders all review cards in the array, very inefficient
export function renderUI(games){
    // Empty the container for re-rendering new reviews
    container.innerHTML = ``;
    reviewElements = [];

    games.forEach(game => {
        const card = reviewCard.createReviewCard(game);
        reviewElements.push(card);
    });
    renderReviews();
}



function renderReviews(){
    reviewElements.forEach(x => {
        //append review elements to the container to be rendered
        container.appendChild(x);
    });
}

