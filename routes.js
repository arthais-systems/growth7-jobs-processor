const express = require('express');
const ProcessamentoDeDados = require('./processamento-de-dados');

const router = express.Router();
const processamentoService = new ProcessamentoDeDados();

router.post('/', (req, res) => {
  const entrada = req.body;
  const resposta = processamentoService.processar(entrada);
  res.json(resposta);
});

module.exports = router;
