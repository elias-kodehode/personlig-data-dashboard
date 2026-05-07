const modal = document.getElementById("createModal");
const openBtn = document.getElementById("openBtn");
const saveBtn = document.getElementById("saveBtn");
const closeBtn = document.getElementById("closeBtn");


const gameTitleInput = document.getElementById("game-title");
const gameReviewInput = document.getElementById("game-review");
const gamePlaytimeInput = document.getElementById("game-playtime");
const gameRatingInput = document.getElementById("game-rating");


let currentId;

openBtn.addEventListener("click", e => {
    modal.showModal();
    currentId = crypto.randomUUID();
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
    localStorage.setItem(currentId, JSON.stringify({
        id: currentId,
        title: gameTitleInput.value,
        review: gameReviewInput.value,
        playtime: gamePlaytimeInput.value,
        rating: gameRatingInput.value
    }));
    modal.close();

    document.dispatchEvent(new CustomEvent("onreviewcreated", {
        
    }));
}

