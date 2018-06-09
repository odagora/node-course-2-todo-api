const expect = require('expect');
const request = require('supertest');

//Importing the express server in 'server.js' file:
const {app} = require('./../server');
//Importing the 'Todo' model:
const {Todo} = require('./../models/todo');

//Run some code before each test to be sure that the database is empty:
beforeEach((done) => {
  //We use the remove() method which is similar to the mongoDB native method, passing and empty object. This function is going to move on only when we call done:
  Todo.remove({}).then(() => done());
});

//Group the tests with the 'describe' mocha method:
describe('POST /todos', () => {
  //First test:
  it('should create a new todo', (done) => {
    var text = 'Test todo text'

    //Call of the supertest library:
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        //If the text from body response is equal to the text defined, then:
        Todo.find().then((todos) => {
          //Asuming that the database is empty:
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });
  //Second test when no data is stored due to invalid body:
  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      //Send an empty object:
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });
});
