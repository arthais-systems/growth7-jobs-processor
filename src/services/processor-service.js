class ProcessorService {
    process(entrada) {
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
  
      return conjuntosDeTrabalho;class ProcessorService {
        process(input) {
          if (!input || input.length === 0) {
            return [{ message: "Empty or missing input array." }];
          }
      
          // Sort jobs by maximum completion date and then by estimatedTime
          input.sort((a, b) => {
            const dateA = new Date(a.maxDateOfCompletion);
            const dateB = new Date(b.maxDateOfCompletion);
            if (dateA - dateB === 0) {
              return a.estimatedTime - b.estimatedTime;
            }
            return dateA - dateB;
          });
      
          const workSets = [];
          let workSet = [];
          let totalEstimatedTime = 0;
          let currentDate = null;
      
          for (const job of input) {
            const estimatedTimeHours = job.estimatedTime;
            const completionDate = new Date(job.maxDateOfCompletion);
      
            if (
              currentDate &&
              (totalEstimatedTime + estimatedTimeHours > 8 ||
                completionDate > currentDate)
            ) {
              workSets.push(workSet);
              workSet = [];
              totalEstimatedTime = 0;
            }
      
            workSet.push(job);
            totalEstimatedTime += estimatedTimeHours;
            currentDate = completionDate;
          }
      
          // Add the last work set if it exists
          if (workSet.length > 0) {
            workSets.push(workSet);
          }
      
          return workSets;
        }
      }
      
    }
  }
  
  module.exports = ProcessorService;
  