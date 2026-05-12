import * as ui  from "./ui.js";
import * as db from "./dataAccess.js";
import { testData } from "./testData.js";
import {rerender, setSorting} from "./state.js";



//remove review from localStorage and re-rerender
document.addEventListener("onreviewdeleted", (e) => {
    db.removeItemById(e.detail.id);
    rerender();
});

document.querySelector("#delete-all-btn").addEventListener("click", () => {
    const promptResult = confirm("are you sure?");

    if(promptResult){
        db.removeAllItems();
        rerender();
    }
});


//this gets called when an item is created or edited, handle it accordingly
document.addEventListener("onreviewmodified", e => {
    const mode = e.detail.mode;
    const data = e.detail.data;
    //dataAccess.js handles creating and editing
    db.addItem(data);
    rerender();
});


//rerender when the sorting method has been changed
document.addEventListener("onsortchanged", e => {
    const sorting = e.detail.sorting;
    setSorting(sorting);
    rerender();
});


//render the ui on initial load
document.addEventListener("DOMContentLoaded", () => {
    //fill with dummy data if there is no data
    if(db.size() == 0){
        db.addItems(testData);
    }
    rerender();
});