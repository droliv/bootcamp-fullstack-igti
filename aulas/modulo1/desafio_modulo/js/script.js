window.addEventListener('load', start);

let globalUsers = [];
let filteredUsers = [];
let inputSearch = null;
let button = null;
let noUsersMessage = "Nenhum usuário filtrado";
let noDataMessage = "Nada a ser exibido"
function start() {
    getUsers();
    renderUsersFiltered();
    renderStatistics();

}

function renderUsersFiltered() {
    let divUsers = document.getElementById('usuarios');
    console.log(filteredUsers.length === 0)
    if (filteredUsers.length === 0) {
        divUsers.innerHTML = '<h2>' + noUsersMessage + '</h2>'
    } else {
        divUsers.innerHTML = ''
        for (let user of filteredUsers) {
            let p = document.createElement('p');
            p.textContent = user.name;
            divUsers.appendChild(p);
        }
    }
    
}

function renderStatistics() {
    let divData = document.getElementById('estatisticas');
    divData.innerHTML = '<h2>' + noDataMessage + '</h2>'
}

function getUsers () {
    fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo').then(response => {
        response.json().then(data => {
            this.globalUsers = data.results.map(result => {
                let user = {
                    image: result.picture.medium,
                    name: `${result.name.first} ${result.name.last}`,
                    age: result.dob.age,
                    gender: result.gender
                }
                return user;
            })
            inputSearch = document.getElementById('search');
            inputSearch.disabled = false;
            inputSearch.addEventListener('keyup', handleKeyUp);
        })
    })
}

function handleKeyUp(event) {
    button = document.getElementById('button');
    if (event.target.value !== '') {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
    if (event.key === 'Enter') {
        filterUsers(event.target.value);
    }
}

function filterUsers(value) {
    filteredUsers = this.globalUsers.filter(user => user.name.includes(value));
    console.log(filteredUsers);
    renderUsersFiltered();
    renderStatistics();
}