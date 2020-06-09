const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

let grades = [];
app.use(express.json());

app.get('/', (req,res) => {
    grades = readGrades();
    res.status(200).send(grades);
})

app.get('/:id', (req,res) => {
    res.status(200).send(findGrade(req.params.id));
})

app.post('/sum', (req, res) => {
    let sum = sumGrade(req.body);
    res.json({'soma': sum});
})

app.post('/media', (req, res) => {
    let media = averageGrade(req.body);
    res.json({'media': media});
})

app.post('/biggest', (req, res) => {
    let biggests = findBiggestGrades(req.body);
    res.json({'maiores': biggests});
})

app.post('/', (req, res) => {
    res.status(200).send(addGrade(req.body));
})

app.put('/', (req, res) => {
    res.status(200).send(editGrade(req.body));
})

app.delete('/:id', (req, res) => {
    res.status(200).send(removeGrade(req.params.id));
})

function readGrades() {
    let grades = fs.readFileSync('./newgrades.json', 'utf-8');
    return JSON.parse(grades);
}

function addGrade(grade) {
    grades = readGrades();
    grade.id = grades.nextId;
    grade.timestamp = new Date();
    grades.nextId = gerarId(grades);
    grades.grades.push(grade);
    fs.writeFileSync('./newgrades.json', JSON.stringify(grades));
    return grades;
}

function editGrade(data) {
    data.timestamp = new Date();
    grades = readGrades();
    let index = grades.grades.findIndex(grade => grade.id === data.id);
    grades.grades[index] = data
    fs.writeFileSync('./newgrades.json', JSON.stringify(grades));
    return grades;
}

function removeGrade(id) {
    grades = readGrades();
    let index = grades.grades.findIndex(grade => grade.id === parseInt(id));
    grades.grades.splice(index, 1);
    fs.writeFileSync('./newgrades.json', JSON.stringify(grades));
    return grades;
}

function findGrade(id) {
    grades = readGrades();
    return grades.grades.find(grade => grade.id === parseInt(id));
}

function gerarId(grades) {
    let id = Math.ceil(Math.random() * 100);
    console.log(grades)
    let ids = grades.grades.map(grade => {
        return grade.id;
    })
    while (ids.indexOf(id) >= 0) {
        id = Math.ceil(Math.random() * 100);
    }
    return id;
}

function sumGrade(data) {
    grades = readGrades();
    let sum = grades.grades.filter(grade => grade.student === data.student && grade.subject === data.subject).reduce((sum, grade) => sum += grade.value, 0);
    console.log(sum);
    return sum;
}

function averageGrade(data) {
    grades = readGrades();
    let filter = grades.grades.filter(grade => (grade.type == data.type) && (grade.subject == data.subject));
    let media = filter.reduce((sum, grade) => sum += grade.value, 0) / filter.length;
    return media;
}

function findBiggestGrades(data){
    grades = readGrades();
    let filter = grades.grades.filter(grade => (grade.type == data.type) && (grade.subject == data.subject)).sort((a,b) => {
        if (a.value > b.value) return -1;
        if (a.value < b.value) return 1;
        return 0
    });
    let newArray = [];
    for (let i = 0; i < 3; i++) {
        newArray.push(filter[i]);
    }
    return newArray
}


app.use(cors());

module.exports = app;