import * as db from "./dataAccess.js";
const modal = document.getElementById("edit-modal");
const saveBtn = document.getElementById("edit-save-btn");
const closeBtn = document.getElementById("edit-close-btn");


const gameTitleInput = document.querySelector("#edit-modal [data-game-title]");
const gameReviewInput =document.querySelector("#edit-modal [data-game-review]");
const gamePlaytimeInput = document.querySelector("#edit-modal [data-game-playtime]");
const gameRatingInput = document.querySelector("#edit-modal [data-game-rating]");


let currentItem = null;

closeBtn.addEventListener("click", e => {
    resetInputFields();
    modal.close();
});


//reset fields, to prevent having to instantiate the modal every time
function resetInputFields(){
    gameTitleInput.value = "";
    gameReviewInput.value = "";
    gameRatingInput.value = "";
    gamePlaytimeInput.value = "";
}

saveBtn.addEventListener("click", e => {
    save();
});


export function edit(id){
    const item = db.getItemById(id);
    currentItem = item;
    gameTitleInput.value = item.title;
    gameReviewInput.value = item.review;
    gameRatingInput.value = item.rating;
    gamePlaytimeInput.value = item.playtime;



    modal.showModal();
}


export function save(){

    if(gameTitleInput.value === "" || gameReviewInput.value === "" || gamePlaytimeInput.value === "" || gameRatingInput.value === ""){
        console.error("All fields are required");
        return;
    }


    if(gameRatingInput.value > 10){
        console.error("rating cannot be greater than 10")
        return;
    }

    if(gamePlaytimeInput.value <= 0){
        console.error("playtime must be greater than 0")
        return;
    }


    db.addItem({
        id: currentItem.id,
        title: gameTitleInput.value,
        review: gameReviewInput.value,
        playtime: gamePlaytimeInput.value,
        rating: gameRatingInput.value
    });

    document.dispatchEvent(new CustomEvent("onreviewcreated", {}));
    modal.close();

}

