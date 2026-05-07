import * as ui  from "./ui.js";



let currentOrderering = "default";

document.addEventListener("onreviewdeleted", (e) => {
    localStorage.removeItem(e.detail.id);
    render();
});


document.addEventListener("onreviewcreated", () => {
    render();
});

document.addEventListener("onorderchanged", e => {
    const order = e.detail.order;
    currentOrderering = order;
    render();
});


document.addEventListener("DOMContentLoaded", () => {
    render();
});

function render(){
    console.log("current ordering: " + currentOrderering)
    let games = Object.values(localStorage).map(x => JSON.parse(x));


    orderGames(games);
    ui.populateUI(games);
}

function orderGames(games){
    if(currentOrderering === null || currentOrderering === "default"){
        return;
    }
    if(currentOrderering == "playtime-high"){
        games.sort((a,b) => a.playtime -b.playtime).reverse();
    }
    
    if(currentOrderering == "playtime-low"){
        games.sort((a,b) => a.playtime -b.playtime);
    }

    if(currentOrderering == "rating-high"){
        games.sort((a,b) => a.rating -b.rating).reverse();
    }

    if(currentOrderering == "rating-low"){
        games.sort((a,b) => a.rating -b.rating);
    }
}