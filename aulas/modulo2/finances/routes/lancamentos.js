const express = require('express')
const router = express.Router();
const fs = require('fs').promises;
const { inserirLancamento } = require('../controllers/lancamentosController');

router.post('/receita', async (req, res) => {
    let lancamento = req.body;
    res.send(await inserirLancamento(lancamento, 'r'));
})
router.post('/despesa', async (req,res) => {
    let lancamento = req.body;
    res.send(await inserirLancamento(lancamento, 'd'));
})

module.exports = router