class ProcessamentoDeDados {
    processar(entrada) {
      if (!entrada || entrada.length === 0) {
        return [{ message: "Array de entrada vazio ou ausente." }];
      }
  
      // Ordenar os jobs por data máxima de conclusão e, em seguida, por estimatedTime
      entrada.sort((a, b) => {
        const dataA = new Date(a.maxDateOfConclusion);
        const dataB = new Date(b.maxDateOfConclusion);
        if (dataA - dataB === 0) {
          return a.estimatedTime - b.estimatedTime;
        }
        return dataA - dataB;
      });
  
      const conjuntosDeTrabalho = [];
      let conjuntoDeTrabalho = [];
      let tempoEstimadoTotal = 0;
      let dataAtual = null;
  
      for (const job of entrada) {
        const tempoEstimadoHoras = job.estimatedTime;
        const dataConclusao = new Date(job.maxDateOfConclusion);
  
        if (
          dataAtual &&
          (tempoEstimadoTotal + tempoEstimadoHoras > 8 ||
            dataConclusao > dataAtual)
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
  }
  
  module.exports = ProcessamentoDeDados;
  