const fs = require('fs').promises;

async function inserirLancamento(lancamento, type) {
    const data = await fs.readFile(global.fileName);
    const json = JSON.parse(data);
    lancamento.id = json.nextId;
    json.nextId += 1;
    if (type === 'd') {
        lancamento.valor = lancamento.valor * (-1)
        console.log(lancamento.valor)
    }
    json.lancamentos.push(lancamento);

    await fs.writeFile(global.fileName, JSON.stringify(json));

    return lancamento;
}

module.exports.inserirLancamento = inserirLancamento