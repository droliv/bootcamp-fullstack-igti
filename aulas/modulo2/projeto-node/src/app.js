const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(express.json());

app.get('/', (req,res) => {
    readStates();
    res.status(200).send('ok');
})

function readStates() {
    let states = fs.readFile('./Estados.json', (err, data) => {
        if (err) {
            console.log(err);
        }
    })
}
function createFileStateCities() {
    
}

app.use(cors());

module.exports = app;