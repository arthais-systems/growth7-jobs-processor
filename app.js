const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes'); // Importe o arquivo de rotas corretamente

const app = express();
const port = process.env.PORT || 3000;

// Middleware para processar dados JSON
app.use(bodyParser.json());

// Rota para receber e processar o JSON
app.use('/processar-json', routes); // Use o middleware de rotas corretamente

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
