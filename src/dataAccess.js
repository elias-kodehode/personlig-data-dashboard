export function getItemById(id){
    const data = localStorage.getItem(id);

    return JSON.parse(data);
}

export function addItem(data){

    //if it already exists in storage, dont make a new id
    if(data.id){
        localStorage.setItem(data.id,JSON.stringify(data));
        return;
    }

    //give the review an id
    const game  = { "id": crypto.randomUUID(), ...data};
    localStorage.setItem(game.id,JSON.stringify(game));
}

export function removeItem(item){
    removeItemById(item.id);
}

export function removeItemById(id){
    localStorage.removeItem(id);
}

export function removeAllItems(){

    localStorage.clear();
}

export function getAllItems(){
    const items = Object
    .values(localStorage)
    .map(x => JSON.parse(x));
    return items;
}

export function size (){
    return localStorage.length;
}
///get the first review with the title
export function getItemByTitle(title){
    const items = getAllItems();
    return items.find(x => x.title.toLowerCase().includes(title.toLowerCase())) ?? null;

}

///get all reviews containing the query
export function getItemsContaining(query){
    const items = getAllItems();
    return items.filter(x => x.title.toLowerCase().includes(query.toLowerCase())) ?? [];
}