
const assert = require('assert');
const dao = require('../dao');

describe('To send or not to send a form', () => {
  it('Dont give go when there is a form in the DB with the same title as the one to insert', () => {
    const itemsInDB = [
      {title: 'Le Thomas', questions: ['What is your name?', 'Which school do you attend?']},
      {title: 'Le Fabien', questions: ['What is your name?', 'Which school do you attend?']},
    ];
    const toInsert = {title: 'Le Thomas', questions: ['What is your lastname?', 'Do you like maths?']};

    assert.ok(!dao.canInsertFormGivenDBContent(toInsert, itemsInDB));
  });
  it('Give go when there is no form in the DB with the same title as the one to insert', () => {
    const itemsInDB = [
      {title: 'Le Thomas', questions: ['What is your name?', 'Which school do you attend?']},
    ];
    const toInsert = {title: 'Le Fabien', questions: ['What is your name?', 'Which school do you attend?']};

    assert.ok(dao.canInsertFormGivenDBContent(toInsert, itemsInDB));
  });
});
