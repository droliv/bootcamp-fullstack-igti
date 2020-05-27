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
    if (filteredUsers.length === 0) {
        divUsers.innerHTML = '<h2>' + noUsersMessage + '</h2>'
    } else {
        divUsers.innerHTML = ''
        for (let user of filteredUsers) {
            let p = document.createElement('p');
            let img = document.createElement('img');
            img.src = user.image;
            img.alt = 'alt text';
            p.textContent = `${user.name}, ${user.age}`;
            p.appendChild(img);
            divUsers.appendChild(p);
        }
    }
    
}

function renderStatistics() {
    let divData = document.getElementById('estatisticas');
    if (filteredUsers.length === 0) {
        divData.innerHTML = '<h2>' + noUsersMessage + '</h2>'
    } else {
        divData.innerHTML = ''
        divData.innerHTML += `<p> Masculino: ${sumMasculin()}</p>`
        divData.innerHTML += `<p> Feminino: ${sumFemale()} </p>`
        divData.innerHTML += `<p> Soma das idades: ${sumAges()} </p>`
        divData.innerHTML += `<p> Media das idades: ${mediaAges()} </p>`
    }
}
function mediaAges() {
    return sumAges() / filteredUsers.length
}

function sumAges() {
    let ages = filteredUsers.reduce((age, user) => {
        return age += user.age;
    },0)

    return ages;
}
function sumMasculin() {
   let sum = filteredUsers.filter(user => user.gender === 'male').reduce(sum => sum + 1, 0)
   return sum

}

function sumFemale() {
    let sum = filteredUsers.filter(user => user.gender === 'female').reduce(sum => sum + 1, 0)
   return sum
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
    filteredUsers = this.globalUsers.filter(user => {
        return user.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    renderUsersFiltered();
    renderStatistics();
}