import * as db from "./dataAccess.js";
import {rerender} from "./state.js";

const form = document.querySelector("#review-form");

const modal = document.querySelector("#review-modal")
const modalHeader = document.querySelector("#modal-header")
const titleElement = document.querySelector("[data-game-title]");
const reviewELement =document.querySelector("[data-game-review]");
const playtimeElement = document.querySelector("[data-game-playtime]");
const ratingElement = document.querySelector("[data-game-rating]");
const closeBtn = document.querySelector("[data-close-button]");

let currentItem = null;
//edit, create
let mode = "edit";

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if(!titleElement.value || !reviewELement.value || !playtimeElement.value || !ratingElement.value)
        return;
    
    const data = {
        id: mode == "edit" ? currentItem.id: null,
        title: titleElement.value,
        review: reviewELement.value,
        playtime: playtimeElement.value,
        rating: ratingElement.value,
    };

    //notify the system that an element has been modified
    document.dispatchEvent( new CustomEvent("onreviewmodified", {
        detail:{
            mode: mode,
            data: data
        }
    }));
    modal.close();
});


closeBtn.addEventListener("click", () => {
    modal.close();
});

export function openReviewModal({modalMode, item}){
    resetInputFields();
    if(modalMode === "create"){
        create();
    }
    if(modalMode === "edit"){
        edit(item);
    }
}

function create(){
    mode = "create";
    currentItem = null;
    modalHeader.textContent = "Create Review";
    modal.showModal();
}

function edit(review){
    mode = "edit";
    modalHeader.textContent = "Edit Review"
    currentItem = review;
    titleElement.value = review.title;
    ratingElement.value = review.rating;
    playtimeElement.value = review.playtime;
    reviewELement.value = review.review;
    modal.showModal();
}

function resetInputFields(){
    titleElement.value = "";
    reviewELement.value = "";
    ratingElement.value = "";
    playtimeElement.value = "";
}
