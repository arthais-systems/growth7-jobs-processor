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

// Função para processar os dados
function processarDados(entrada) {
  // Verificar se o array de entrada está vazio
  if (!entrada || entrada.length === 0) {
    return [{ message: 'Array de entrada vazio ou ausente.' }];
  }

  // Ordenar os jobs por data máxima de conclusão em ordem crescente
  entrada.sort((a, b) => new Date(a.maxDateOfConclusion) - new Date(b.maxDateOfConclusion));

  const conjuntosDeTrabalho = [];
  let conjuntoDeTrabalho = [];
  let tempoEstimadoTotal = 0;
  let dataAtual = null;

  for (const job of entrada) {
    const tempoEstimadoHoras = job.estimatedTime;
    const dataConclusao = new Date(job.maxDateOfConclusion);

    if (
      dataAtual &&
      (tempoEstimadoTotal + tempoEstimadoHoras > 8 || dataConclusao > dataAtual)
    ) {
      conjuntosDeTrabalho.push(conjuntoDeTrabalho);
      conjuntoDeTrabalho = [];
      tempoEstimadoTotal = 0;
    }

    conjuntoDeTrabalho.push(job);
    tempoEstimadoTotal += tempoEstimadoHoras;
    dataAtual = dataConclusao;
  }

  // Adicionar o último conjunto de trabalho, se houver
  if (conjuntoDeTrabalho.length > 0) {
    conjuntosDeTrabalho.push(conjuntoDeTrabalho);
  }

  return conjuntosDeTrabalho;
}

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
