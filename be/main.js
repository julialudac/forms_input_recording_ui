const express = require('express');

const app = express();

app.post('/validateForm', (req, res) => {
  candidateForm = req.query;
  const formValidator = require('./formValidator');
  const answer = formValidator.validateForm(req.query);
  console.log(`${JSON.stringify(req.query)} is a valid form? ${answer}`);
  res.send(formValidator.validateForm(req.query));
}).listen(5000);
