const express = require('express');

const app = express();
const dao = require('./dao');

app.get('/', (req, res) => {
  res.send(`
  <html>
    <head></head>
    <body><h1>Coucou</h1></body>
  </html>
  `);
});

app.post('/validateForm', (req, res) => {
  const formValidator = require('./formValidator');
  const answer = formValidator.validateForm(req.query);
  console.log(`${JSON.stringify(req.query)} is a valid form? ${answer}`);
  res.send(formValidator.validateForm(req.query));
});

app.post('/registerForm', (req, res) => {
  const form = req.query;
  // TODO not async for now. Make it async!
  const result = dao.insertForm(form); // not really handled for now. Assumed to be ok
  res.send(result);
});

app.post('/registerSheet', (req, res) => {
  const sheet = req.query;
  // TODO not async for now. Make it async!
  const result = dao.insertSheet(sheet); // not really handled for now. Assumed to be ok
  res.send(result);
});


// TODO dao this. How is it possible with those async calls???
app.use('/getFormTitles', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const dbpath = 'mongodb://localhost:27017';
  MongoClient.connect(dbpath, (err, client) => {
    const db = client.db('FormsRecorder');
    db.collection('forms', (err, collection) => {
      collection.find({}).toArray((err, result) => { 
        const titles = result.map(element => element['title']);
        console.log('titles to be sent:', titles);
        res.send(titles);
      }); 
    });
    client.close();
  });
});

app.use('/getFormByTitle', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const dbpath = 'mongodb://localhost:27017';
  MongoClient.connect(dbpath, (err, client) => {
    const db = client.db('FormsRecorder');
    db.collection('forms', (err, collection) => {
      collection.find({title:req.query.title}).toArray((err, result) => { 
        console.log('forms to be sent:', result);
        res.send(result);
      }); 
    });
    client.close();
  });
});

app.use('/getSheetTitles', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const dbpath = 'mongodb://localhost:27017';
  MongoClient.connect(dbpath, (err, client) => {
    const db = client.db('FormsRecorder');
    db.collection('sheets', (err, collection) => {
      collection.find({}).toArray((err, result) => { 
        const titles = result.map(element => element['title']);
        console.log('titles to be sent:', titles);
        res.send(titles);
      }); 
    });
    client.close();
  });
});

app.listen(5000);
