const express = require('express');
const ProcessorService = require('../services/processor-service');

const router = express.Router();
const processorService = new ProcessorService();

router.post('/', (req, res) => {
  const input = req.body;
  const response = processorService.process(input);
  res.json(response);
});

module.exports = router;
