import {} from "./createGameModal.js";
import * as utils from "./utils.js";


const games = [];
const orderByElement = document.querySelector("select");

orderByElement.addEventListener("change", (e) => {
    const selection = e.target.value;
});



function renderUI(){

}
export function populateUI(){
    const keys = utils.getAllKeys();

    for (const key of keys) {
        games.push(JSON.parse(localStorage.getItem(key)));
        
    }

   
    console.log( games.sort( (a,b) => a.playtime - b.playtime));
}