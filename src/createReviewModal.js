import * as db from "./dataAccess.js";
const modal = document.getElementById("create-modal");
const openBtn = document.getElementById("openBtn");
const saveBtn = document.getElementById("create-save-btn");
const closeBtn = document.getElementById("create-close-btn");


const gameTitleInput = document.querySelector("#create-modal [data-game-title]");//document.getElementById("game-title");
const gameReviewInput =document.querySelector("#create-modal [data-game-review]"); //document.getElementById("game-review");
const gamePlaytimeInput = document.querySelector("#create-modal [data-game-playtime]");//document.getElementById("game-playtime");
const gameRatingInput = document.querySelector("#create-modal [data-game-rating]");//document.getElementById("game-rating");


openBtn.addEventListener("click", e => {
    modal.showModal();
    resetInputFields();
});

closeBtn.addEventListener("click", e => {
    resetInputFields();
    modal.close();
});


function resetInputFields(){
    gameTitleInput.value = "";
    gameReviewInput.value = "";
    gameRatingInput.value = "";
    gamePlaytimeInput.value = "";
}

saveBtn.addEventListener("click", e => {
    save();
});



export function save(){

    if(gameTitleInput.value === "" || gameReviewInput.value === "" || gamePlaytimeInput.value === "" || gameRatingInput.value === ""){
        console.error("All fields are required");
        return;
    }


    db.addItem({
        title: gameTitleInput.value,
        review: gameReviewInput.value,
        playtime: gamePlaytimeInput.value,
        rating: gameRatingInput.value
    });
    document.dispatchEvent(new CustomEvent("onreviewcreated", {}));
    modal.close();

}

