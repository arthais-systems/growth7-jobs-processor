process.env.NODE_ENV = 'test';

const ProcessorService = require("../src/services/processor-service");
const fs = require('fs');
const path = require('path');

describe("ProcessorService", () => {
  describe("#process()", () => {
    it("should group jobs correctly", () => {
      const processorService = new ProcessorService();
      
      const inputFilePath = path.join(__dirname, '../jobs-entrada.json');
      const input = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8'));

      const expectedResultFilePath = path.join(__dirname, '../jobs-saida.json');
      const expectedResult = JSON.parse(fs.readFileSync(expectedResultFilePath, 'utf-8'));

      const result = processorService.process(input);

      expect(result).toEqual(expectedResult);
    });
  });
});
