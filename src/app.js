import * as ui  from "./ui.js";

//default, playtime-high, playtime-low, rating-high, rating-low
let currentSorting = "default";


//remove review from localStorage and re-render
document.addEventListener("onreviewdeleted", (e) => {
    localStorage.removeItem(e.detail.id);
    render();
});


//re-render ui elements when a new review has been created
//NOTE: very inefficient as it re-renders every single element
document.addEventListener("onreviewcreated", () => {
    render();
});

//re-render when the sorting method has been changed
document.addEventListener("onsortchanged", e => {
    const sorting = e.detail.sorting;
    currentSorting = sorting;
    render();
});


//render the ui on initial load
document.addEventListener("DOMContentLoaded", () => {
    render();
});


function render(){

    //get games from local storage and parse them from JSON -> object
    let reviews = Object
        .values(localStorage)
        .map(x => JSON.parse(x));


        //add dummy data if there is no reviews
    if(reviews.length == 0){
        for (const data of testData) {

            const game  = { "id": crypto.randomUUID(), ...data};

            localStorage.setItem(game.id,JSON.stringify(game));
            document.dispatchEvent(new CustomEvent("onreviewcreated", {}));
        }
        location.reload();
    }
    //sort the games with the selected sorting
    sortGames(reviews);

    //tell the ui to re-render elements
    ui.renderUI(reviews);
}

function sortGames(games){
    if(currentSorting === null || currentSorting === "default"){
        return;
    }
    if(currentSorting == "playtime-high"){
        games.sort((a,b) => a.playtime -b.playtime).reverse();
    }
    
    if(currentSorting == "playtime-low"){
        games.sort((a,b) => a.playtime -b.playtime);
    }

    if(currentSorting == "rating-high"){
        games.sort((a,b) => a.rating -b.rating).reverse();
    }

    if(currentSorting == "rating-low"){
        games.sort((a,b) => a.rating -b.rating);
    }
}


//thanks chatgpt
const testData = [
    {
        "title": "Cyberpunk 2077",
        "review": "Started rough but it's actually amazing now. Night City feels alive and the story hits hard.",
        "rating": 9,
        "playtime": 120
    },
    {
        "title": "Stardew Valley",
        "review": "Accidentally spent six hours farming parsnips. Very relaxing game.",
        "rating": 10,
        "playtime": 230
    },
    {
        "title": "Counter-Strike 2",
        "review": "Every match is either the best experience ever or psychological warfare.",
        "rating": 7,
        "playtime": 540
    },
    {
        "title": "Elden Ring",
        "review": "Exploration is incredible and every boss made me question my life choices.",
        "rating": 10,
        "playtime": 180
    },
    {
        "title": "Overwatch 2",
        "review": "Fun with friends but matchmaking can feel pretty inconsistent.",
        "rating": 6,
        "playtime": 95
    },
    {
        "title": "Minecraft",
        "review": "Still one of the best sandbox games ever made. Endless creativity.",
        "rating": 10,
        "playtime": 1200
    },
    {
        "title": "Apex Legends",
        "review": "Movement feels amazing but I get destroyed every game.",
        "rating": 8,
        "playtime": 140
    },
    {
        "title": "The Witcher 3: Wild Hunt",
        "review": "One of the few RPGs where side quests are just as memorable as the main story.",
        "rating": 10,
        "playtime": 260
    },
    {
        "title": "Dead by Daylight",
        "review": "Stressful, chaotic, and somehow still fun after hundreds of hours.",
        "rating": 7,
        "playtime": 310
    },
    {
        "title": "Hades",
        "review": "Insanely polished roguelike with great combat and characters.",
        "rating": 9,
        "playtime": 75
    },
    {
        "title": "Rainbow Six Siege",
        "review": "Very rewarding once you learn the maps, but the learning curve is brutal.",
        "rating": 8,
        "playtime": 410
    },
    {
        "title": "Among Us",
        "review": "Peak friendship destruction simulator.",
        "rating": 8,
        "playtime": 35
    },
    {
        "title": "Dark Souls III",
        "review": "Pain. Suffering. Masterpiece.",
        "rating": 9,
        "playtime": 150
    },
    {
        "title": "Terraria",
        "review": "Looks simple at first but has an absurd amount of content.",
        "rating": 10,
        "playtime": 500
    },
    {
        "title": "Starfield",
        "review": "Some great moments but exploration didn't fully click for me.",
        "rating": 6,
        "playtime": 60
    }
];