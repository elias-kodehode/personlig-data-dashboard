import * as ui from "./ui.js";
import * as db from "./dataAccess.js";

//default, playtime-high, playtime-low, rating-high, rating-low
let currentSorting = "default";


//rerender the UI
export function rerender() {
    const reviews = db.getAllItems();
    reviews.sort(sorters[currentSorting]);
    ui.renderUI(reviews);
}

//set the sorting
export function setSorting(value){
    currentSorting = value;
}


const sorters = {
    "default": () => 0,
    "rating-high": (a,b) => b.rating - a.rating,
    "rating-low": (a,b) => a.rating -b.rating,
    "playtime-high": (a,b) => b.playtime - a.playtime,
    "playtime-low": (a,b) => a.playtime - b.playtime,
    "alphabetical": (a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      },"alphabetical-reverse": (a, b) => {
        if (a.title < b.title) return 1;
        if (a.title > b.title) return -1;
        return 0;
      }
};