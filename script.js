let inputTask = document.querySelector('#inputTask');
let addButton = document.querySelector('#addButton');
let ulItems = document.querySelector('#ul-items');
let buttonSelect = document.querySelector('#buttonSelect');

let arrayChecks = [];
let id = 0;

addButton.addEventListener('click', () => {    
    if (valueInput()) {        
        addTask(inputTask.value, id);
        id++;
    }
});

document.addEventListener('keyup', (event) => {
    if (valueInput() && event.keyCode === 13) {        
        addTask(inputTask.value, id);
        id++;
    }
});

buttonSelect.addEventListener('click', event => {
    if (arrayChecks.length > 0) {
        deleteAllTasks();
    }
})

const deleteAllTasks = () => {
    for (elements of arrayChecks) {        
        elements.element.remove();
        localStorage.removeItem('value-'+elements.id);
    }    
    showButton(false);
    cleanInput();
}

const valueInput = () => {    
    return inputTask.value.length > 3        
}

const showButton = (bool) => {
    return bool ? buttonSelect.style.display = 'inline' : buttonSelect.style.display = 'none'
}

const cleanInput = () => {
    inputTask.value = '';
}

const addTask = (text, id) => {  
    task(text, id);   
    localStorage.setItem(`value-${id}`, JSON.stringify({ text, id }));        
    cleanInput();
}

const deleteTask = (id) => {
    let element = document.querySelector(`#delete${id}`);
    element.parentElement.remove();

    localStorage.removeItem(`value-${id}`);
}

const selectTask = (id) => {        

    let element = document.querySelector(`#checkbox${id}`);                                      

    if (element.checked === true) {
        arrayChecks.push({id, element: element.parentNode})
    } else {
        arrayChecks.pop({id, element: element.parentNode})
    }    
    
    arrayChecks.length > 0 ? showButton(true) : showButton(false);        
}

const task = (text, id) => {
    let div = document.createElement("div");
    div.classList.add("li-flex");

    let element = `                
        <input type="checkbox" id="checkbox${id}" onclick="selectTask(${id})">
        <label>${text}</label>
        <button id="delete${id}" onclick="deleteTask(${id})">Excluir</button>            
    `
    div.innerHTML = element;
    ulItems.insertAdjacentElement("afterbegin", div);   
}

const mountItems = () => {        
    for (let i = 0; i < localStorage.length; i++) {
        let position = Object.keys(localStorage)[i]

        let item = localStorage.getItem(position);
        item = JSON.parse(item); 

        task(item.text, item.id);        
        id = item.id + 1;
    }        
}

mountItems();