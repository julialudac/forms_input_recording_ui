
const assert = require('assert');

describe('Form validator test', () => {
  it('Empty json is not a form', () => {
    const formValidator = require('../formValidator');
    assert.ok(!formValidator.validateForm({}));
  });
  it(`Json with keys title that holds a string and 
  questions that holds an array is a form`, () => {
    const formValidator = require('../formValidator');
    assert.ok(formValidator.validateForm({
      title: 'Thomas',
      questions: ['Your name?', 'Your height?']
    }));
  });
  it('Random json is not a form', () => {
    const formValidator = require('../formValidator');
    assert.ok(!formValidator.validateForm({
      name: 'Thomas',
      age: 22
    }));
  });
  it(`Json with keys title and questions but
  also other keys is not a form`, () => {
    const formValidator = require('../formValidator');
    assert.ok(!formValidator.validateForm({
      title: 'Toto',
      name: 'Thomas',
      age: 22,
      questions: ['Your name?', 'Your height?']
    }));
  });

});

describe('Checking json objects with only the keys title and questions but not the right type', 
  () => {
  it(`Json with keys title that holds a string and 
  questions that holds a number is NOT a form`, () => {
    const formValidator = require('../formValidator');
    assert.ok(!(formValidator.validateForm({
      title: 'Thomas',
      questions : 22
    })));
  });
  it(`Json with keys title that holds a string and 
  questions that holds a non array json is NOT a form`, () => {
    const formValidator = require('../formValidator');
    assert.ok(!(formValidator.validateForm({
      title: 'Thomas',
      questions : {name: 'Thomas', age: 22}
    })));
  });
  it(`Json with keys title that doesn't hold a string and 
  questions that holds an array is NOT a form`, () => {
    const formValidator = require('../formValidator');
    assert.ok(!(formValidator.validateForm({
      title: {age: 22},
      questions: ['Your name?', 'Your height?']
    })));
  });
});
