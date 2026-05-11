import * as ui  from "./ui.js";
import * as db from "./dataAccess.js";
import { testData } from "./testData.js";
//default, playtime-high, playtime-low, rating-high, rating-low
let currentSorting = "default";


//remove review from localStorage and re-render
document.addEventListener("onreviewdeleted", (e) => {
    db.removeItemById(e.detail.id);
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
    //add dummy data if there is no reviews
    if(db.size() == 0){
        db.addItems(testData);
        // document.dispatchEvent(new CustomEvent("onreviewcreated", {}));  
    }

    const reviews = db.getAllItems();

    //sort the games with the selected sorting
    sortGames(reviews);

    //tell the ui to re-render elements
    ui.renderUI(reviews);
}


//handle sorting
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

    if(currentSorting == "alphabetical"){
        games.sort( (a,b) => {
            if(a.title < b.title){
                return -1;
            }

            if(a.title > b.title){
                return 1;
            }
            return 0;
        });
    }
    if(currentSorting == "alphabetical-reverse"){
        games.sort( (a,b) => {
            if(a.title < b.title ){
                return -1;
            }

            if(a.title > b.title){
                return 1;
            }
            return 0;
        }).reverse();
    }
}
