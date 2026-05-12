export function getItemById(id){
    const data = localStorage.getItem(id);

    return JSON.parse(data) ?? null;
}


export function addItems(items){
    for (let i = 0; i < items.length; i++) {
        addItem(items[i]);
    }
}

//if data contains id, the entry will be modified with new data, but keep the id
//if no id is present it adds a new entry, giving it an id
export function addItem(data){

    //if there is no id then we assume this is a "create" operation
    //otherwise assume "edit" and just update the entry in storage but keeping the same id
    if(data.id === null || data.id === undefined){
        data.id = crypto.randomUUID();
    }

    //if it doesnt have an id here something has gone very wrong
    if(data.id){
        localStorage.setItem(data.id,JSON.stringify(data));
        return;
    }
    else{
        throw new Error("ITEM DOES NOT HAVE AN ID")
    }
}

export function removeItem(item){
    removeItemById(item.id);
}

export function removeItemById(id){
    localStorage.removeItem(id);
}

//delete all reviews
export function removeAllItems(){   
    localStorage.clear();
}

//get all reviews in storage
export function getAllItems(){
    const items = Object
    .values(localStorage)
    .map(x => JSON.parse(x));
    return items;
}

//get amount of reviews in storage
export function size (){
    return localStorage.length;
}

///get the first review with the title
export function getItemByTitle(title){
    const items = getAllItems();
    return items.find(x => x.title.toLowerCase().includes(title.toLowerCase())) ?? null;

}

///get all reviews containing the query
export function getItemsWithTitleContaining(query){
    const items = getAllItems();
    return items.filter(x => x.title.toLowerCase().includes(query.toLowerCase())) ?? [];
}