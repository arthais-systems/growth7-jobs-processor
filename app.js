const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para processar dados JSON
app.use(bodyParser.json());

// Rota para receber e processar o JSON
app.post('/processar-json', (req, res) => {
  const entrada = req.body; // Array JSON enviado no corpo da solicitação
  // Processar os dados e gerar a resposta
  const resposta = processarDados(entrada);
  res.json(resposta); // Enviar a resposta como JSON
});

// Função para processar os dados (exemplo)
function processarDados(entrada) {
  // Implemente sua lógica de processamento aqui
  // Por exemplo, ordenar o Array de entrada e retorná-lo
  return entrada.sort((a, b) => a.ID - b.ID);
}

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
