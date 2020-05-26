// import { toBrDate } from './utils/formaters.js'

let inputTask = document.querySelector('#inputTask');
let addButton = document.querySelector('#addButton');
let ulItems = document.querySelector('#ul-items');
let buttonSelect = document.querySelector('#buttonSelect');
let date = document.querySelector("#date");

date.innerHTML = (new Date()).toLocaleTimeString()

console.log(toBrDate(new Date()))

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

const setDate = () => {
  date.innerHTML = (new Date()).toLocaleTimeString()
}

window.setInterval(setDate, 1000)

const deleteAllTasks = () => {
  for (elements of arrayChecks) {
    elements.element.remove();
    localStorage.removeItem('value-' + elements.id);
    arrayChecks.pop()
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
  let newDate = new Date()
  task(text, id);
  localStorage.setItem(`value-${id}`, JSON.stringify({ text, id, createAt: newDate }));
  cleanInput();
}

const editTask = (id) => {
  let label = document.querySelector(`#label${id}`);
  let newTask = prompt("Nova tarefa", label.textContent);

  if (newTask == null || newTask == '') {
    return
  } else {
    label.textContent = newTask;
    localStorage.setItem(`value-${id}`, JSON.stringify({ text: newTask, id }))    
  }
}

const deleteTask = (id) => {
  let label = document.querySelector(`#label${id}`);

  if (confirm("Tem certeza que quer deletar?")) {
    label.parentElement.remove();
    localStorage.removeItem(`value-${id}`);   
  }
}

const selectTask = (id) => {

  console.log(id)
  let checkbox = document.querySelector(`#checkbox${id}`);
  let label = document.querySelector(`#label${id}`);

  if (checkbox.checked === true) {
    arrayChecks.push({ id, checkbox: checkbox.parentNode })
    label.style.textDecoration = "line-through";
  } else {
    label.style.textDecoration = "";
    arrayChecks.pop()
  }

  arrayChecks.length > 0 ? showButton(true) : showButton(false);
}

const task = (text, id) => {
  let div = document.createElement("div");
  div.classList.add("li-flex");

  let element = `                
        <input type="checkbox" id="checkbox${id}" onclick="selectTask(${id})">
        <label id="label${id}">${text}</label>

        <select onchange={selectItem(${id})} id="select${id}">
            <option value="action">Ação</option>
            <option value="update">editar</option>
            <option value="delete">deletar</option>
        </select>
                 
    `

  // <button id="update${id}" onclick="editTask(${id})">Editar</button>
  // <button id="delete${id}" onclick="deleteTask(${id})">Excluir</button>   

  div.innerHTML = element;
  ulItems.insertAdjacentElement("afterbegin", div);
}

const selectItem = (id) => {
  let select = document.querySelector(`#select${id}`);

  switch (select.value) {
    case "delete":
      deleteTask(id)
      select.value = "action"
      break
    case "update":
      editTask(id)
      select.value = "action"
      break
  }
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