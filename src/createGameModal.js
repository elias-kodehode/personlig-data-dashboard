const modal = document.getElementById("createModal");
const openBtn = document.getElementById("openBtn");
const saveBtn = document.getElementById("saveBtn");
const closeBtn = document.getElementById("closeBtn");


const gameNameInput = document.getElementById("game-name");
const gameReviewInput = document.getElementById("game-review");


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
    gameNameInput.value = "";
    gameReviewInput.value = "";
}

saveBtn.addEventListener("click", e => {
    save();
});

export function save(){

    if(gameNameInput.value === "" || gameReviewInput === ""){
        console.error("All fields are required");
        return;
    }
    localStorage.setItem(currentId, JSON.stringify({
        name: gameNameInput.value,
        review: gameReviewInput.value
    }));
    modal.close();

}

