import * as reviewCard from "./reviewCard.js";
import * as db from "./dataAccess.js";
import * as reviewModal from "./reviewModal.js";

//grid container
const container = document.querySelector(".grid") ?? console.error("grid not found");

const totalPlayTimeElement = document.querySelector("#total-playtime");

document.querySelector("#create-review-btn").addEventListener("click",() => {
    reviewModal.openReviewModal({modalMode: "create"});
});

//tell the system that the sorting has changed
document.querySelector("select").addEventListener("change", (e) => {
    const selection = e.target.value;

    document.dispatchEvent(new CustomEvent("onsortchanged", {
        detail: {
            sorting: selection
        }
    }));
});

//handle deleting all reviews and re-rendering
document.querySelector("#delete-all-btn").addEventListener("click", () => {
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
export function renderUI(reviews){
    // Empty the container for re-rendering new reviews
    container.innerHTML = ``;
    reviewElements = [];

    let totalPlaytime = 0;
    reviews.forEach(r => {
        const card = reviewCard.createReviewCard(r);
        totalPlaytime += parseInt(r.playtime);
        reviewElements.push(card);
    });

    //did this in previous forEach loop instead of in a reduce to avoid unnecessary iterations
    //const totalPlaytime = games.reduce( (accumulator, game) => accumulator + parseInt(game.playtime), 0);
    totalPlayTimeElement.textContent = "Total playtime: " + totalPlaytime +"hrs";
    renderReviews();
}



export function rerender(){
    
}

function renderReviews(){
    reviewElements.forEach(x => {
        //append review elements to the container to be rendered
        container.appendChild(x);
    });
}

