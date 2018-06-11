const expect = require('expect');
const request = require('supertest');

//Importing the express server in 'server.js' file:
const {app} = require('./../server');
//Importing the 'Todo' model:
const {Todo} = require('./../models/todo');

//We use object destructuring to grab the ids:
const {ObjectID} = require('mongodb');

//Array of data to be inserted in the database and test the GET method:
var todos = [{
  _id: new ObjectID,
  text: 'First test todo'
}, {
  _id: new ObjectID,
  text: 'Second test todo',
  completed: true,
  completedAt: 333
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

describe('GET /todos/:id', () => {
  //Fourth test for the GET method for single resources:
  it('should return todo doc', (done) => {
    request(app)
    //We use the variable injection and the 'toHexString' method to convert an object id into string:
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });
  //Fifth test for the GET method for single resources:
  it('should return 404 if todo not found', (done) => {
    //we create a new _id that is not present in the collection:
    var _id = new ObjectID;
    request(app)
      .get(`/todos/${_id.toHexString()}`)
      .expect(404)
      .end(done);
  });
  //Sixth test for the GET method for single resources:
  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  //First test case for the DELETE method for single resources:
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        //Query database using 'findById' and 'toNotExist':
        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });
  //Second test case for the DELETE method for single resources:
  it('should return 404 if todo not found', (done) => {
    //we create a new _id that is not present in the collection:
    var _id = new ObjectID;
    request(app)
      .delete(`/todos/${_id.toHexString()}`)
      .expect(404)
      .end(done);
  });
  //Third test case for the DELETE method for single resources:
  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/123')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    var hexId = todos[0]._id.toHexString();
    //We set some dummy text:
    var text = 'This should be the new text';
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });
  it('should clear completedAt when todo is not completed', (done) => {
    var hexId = todos[1]._id.toHexString();
    //We set some dummy text:
    var text = 'This should be the new text!!';
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        //We assert to the value of completedAt be 'null':
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
  });
});
