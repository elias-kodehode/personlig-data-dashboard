//helper method to get all keys in storage
export  function getAllKeys (){
    const temp = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        temp.push(key);
    }
    return temp;
}

export function getAllEntries(){
    const temp = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        temp.push({ key, value});
    }
    return temp;
}

