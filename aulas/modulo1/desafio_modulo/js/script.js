window.addEventListener('load', start);

let globalUsers = [];
let inputSearch = null;
let noUsersMessage = "Nenhum usuário filtrado";
let noDataMessage = "Nada a ser exibido"
function start() {
    getUsers();
    renderUsersFiltered();
    renderStatistics();

}
function renderUsersFiltered() {
    let divUsers = document.getElementById('usuarios');
    divUsers.innerHTML = '<h2>' + noUsersMessage + '</h2>'
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
            console.log(this.globalUsers)
        })
    })
}