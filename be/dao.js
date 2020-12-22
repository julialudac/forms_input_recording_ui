
const mongoClient = require('mongodb').MongoClient;
const mongoServerAddress = 'mongodb://localhost:27017';

// TODO a function that shouldn't be in a dao!!! Here it is implementation detail
// and shouldn't be exported
function canInsertFormGivenDBContent(element, elementsInDB) {
  return !elementsInDB.some((e) => e.title == element.title);
}

// async function canInsertForm(form) {
//   return canInsertFormGivenDBContent(form, await getForms());
// }

// async function getForms() {
//   const client = await mongoClient.connect(mongoServerAddress);
//   const collection = await client.db.collection('forms');
//   return await collection.find().toArray(); 
// }

// async function getFormTitles(emptyTitlesArray) {
//   const client = await mongoClient.connect(mongoServerAddress);
//   const collection = await client.db.collection('forms');
//   const forms = await collection.find().toArray(); 
//   return forms.map((form) => form.title);
// }

function insertForm(form) {
  // TODO remove hardcode 
  mongoClient.connect(mongoServerAddress, (err, client) => {
    const db = client.db('FormsRecorder');
    db.collection('forms', (err, collection) => {
      // const notAlreadyInserted = await canInsertForm(form); 
      // TODO not touching the asynchronous thing too much now...
      // if(notAlreadyInserted)
        collection.insertOne(form);
      // else
        // console.log('A form with same title already exists in the DB')
    });
    client.close();
  }); 
  // not really handled for now
  return `Form ${JSON.stringify(form)} has been regitered!`;
}

function insertSheet(sheet) {
  mongoClient.connect(mongoServerAddress, (err, client) => {
    const db = client.db('FormsRecorder');
    db.collection('sheets', (err, collection) => {
      collection.insertOne(sheet);
    });
    client.close();
  }); 
  // not really handled for now
  return `Sheet ${JSON.stringify(sheet)} has been regitered!`;
}

exports.insertForm = insertForm;
exports.insertSheet = insertSheet;
exports.canInsertFormGivenDBContent = canInsertFormGivenDBContent; // BAD. Now for the sake of test
