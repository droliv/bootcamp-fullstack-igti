const express = require('express');
const fs = require('fs');
const lancamentosRouter = require('./routes/lancamentos')
global.fileName = 'lancamentos.json';
const app = express();

app.use(express.json());

app.get('/', (req,res) => {
    res.send("ok")
})
app.use('/lancamentos', lancamentosRouter)

app.listen('3000', async () => {
    try{
        const initialJson = {
            nextId: 1,
            lancamentos: []
        }
        await fs.writeFileSync(global.fileName, JSON.stringify(initialJson), {flag: 'wx'});
    } catch(err) {
        console.log(err)
    }
    console.log('rodando...')
})