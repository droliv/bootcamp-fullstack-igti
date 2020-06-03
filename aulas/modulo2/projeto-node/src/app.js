const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

let states = [];
let cities = [];

app.use(express.json());

app.get('/', (req,res) => {
    readFileStates();
    res.status(200).send('ok');
})

app.post('/cidades', (req, res) => {
    let uf = req.body.uf;
    fs.readFile(`./${uf}.json`, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            data = JSON.parse(data);
            res.status(200).send({'cidades': data.length});
        }
    })
})

function readFileStates() {
    fs.readFile('./Estados.json', 'utf-8', (err, data) => {
       try {
           states = JSON.parse(data);
           readFileCities(states);
       } catch(err) {
            console.log(err);
       }
    })
}
function readFileCities(states) {
    fs.readFile('./Cidades.json', 'utf-8', (err, data) => {
        try{
            cities = JSON.parse(data)
            for (state of states) {
                let stateCities = cities.filter(city => city.Estado === state.ID);
                // console.log(stateCities)
                console.log(state.Sigla)
                fs.writeFile(`${state.Sigla}.json`, JSON.stringify(stateCities), (err) => {
                    console.log(err);
                });
            }
        } catch(err) {
            console.log(err)
        }
    })
}

function createFileStateCities() {
    
}

app.use(cors());

module.exports = app;