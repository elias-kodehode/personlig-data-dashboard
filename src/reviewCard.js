import * as modal from "./createReviewModal.js";
const container = document.querySelector(".grid") ?? console.error("grid not found");
const template = document.querySelector("#review-card-template");


//create a copy of a HTML template
export function createReviewCard(card){

    //get the HTML template
    const clone = document.importNode(template.content, true);

    const {id, title, rating, review, playtime} = card;
    
    //set the data-review-id on the element, never do this in the real world
    const root = clone.querySelector(".review-card");
        root.setAttribute("data-review-id", id);


        //store all the card elements for easy manipulation
    const content = {
        id: id,
        title: clone.querySelector("[data-title]"),
        rating: clone.querySelector("[data-rating]"),
        review: clone.querySelector("[data-review] p"),
        playtime: clone.querySelector("[data-playtime] p"),
        deleteButton: clone.querySelector(".delete-review-btn"),
        editButton: clone.querySelector(".edit-review-btn")
    };

    
    //change the card element
    content.title.textContent = `${title}`;
    content.rating.textContent = `${rating}/10`;
    content.review.textContent = `${review}`;
    content.playtime.textContent = `${playtime}hrs`;


    //delete button for each individual card
    content.deleteButton.addEventListener("click", () => {

        const id = root.querySelector("[data-review-id]");
        document.dispatchEvent( new CustomEvent("onreviewdeleted", {
            detail:{
                id: content.id
            }
        }));
    });

    //edit button for each individual card
    content.editButton.addEventListener("click", () => {
        modal.edit(content.id);
    });

    return clone;
}
