window.addEventListener('load', start);
let globalNames = ['um', 'dois', 'três'];
let inputName = null;

function start() {
    preventFormSubmit();
    activateInput();
    renderNames();
}

function handleKeyUp(event) {
    if (event.key === 'Enter') {
        insertNames(event.target.value)
    }
}

function insertNames(name) {
    globalNames.push(name);
    start();
}

function activateInput() {
    inputName = document.getElementById('inputName');
    inputName.focus();
    inputName.addEventListener('keyup', handleKeyUp);
}

function preventFormSubmit(){
    let form = document.getElementById('form');
    form.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(event) {
    event.preventDefault();
}

function renderNames() {
    let divNames = document.getElementById('names');
    divNames.innerHTML = '';
    let ul = document.createElement('ul');
    for (let name of globalNames) {
        let li = document.createElement('li');
        li.textContent = name;
        ul.appendChild(li);
    }
    divNames.appendChild(ul)
    clearInput();
}

function clearInput() {
    inputName.value = ''
}