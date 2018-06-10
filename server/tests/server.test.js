const expect = require('expect');
const request = require('supertest');

//Importing the express server in 'server.js' file:
const {app} = require('./../server');
//Importing the 'Todo' model:
const {Todo} = require('./../models/todo');

//Array of data to be inserted in the database and test the GET method:
var todos = [{
  text: 'First test todo'
}, {
  text: 'Second test todo'
}];

//Run some code before each test to be sure that the database is empty:
beforeEach((done) => {
  //We use the remove() method which is similar to the mongoDB native method, passing and empty object. This function is going to move on only when we call done:
  // Todo.remove({}).then(() => done());

  //To make a GET test we need to have some data in the 'Todos' collection. We use the mongoose insertMany method to insert an array of data:
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
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
        Todo.find({text}).then((todos) => {
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
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  //Third test for the GET method:
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});
