const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
//Import of the models:
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');


const userOneId = new ObjectID();
const userTwoId = new ObjectID();

//Array of data to be inserted in the database and test the GET method for users:
const users = [{
  _id: userOneId,
  email: 'daniel@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'jen@example.com',
  password: 'userTwoPass'
}];

//Array of data to be inserted in the database and test the GET method for todos:
const todos = [{
  _id: new ObjectID,
  text: 'First test todo'
}, {
  _id: new ObjectID,
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

const populateTodos = (done) => {
  //We use the remove() method which is similar to the mongoDB native method, passing and empty object. This function is going to move on only when we call done:
  // Todo.remove({}).then(() => done());

  //To make a GET test we need to have some data in the 'Todos' collection. We use the mongoose insertMany method to insert an array of data:
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    //We can't use the 'insertMany' method as above because it doesn't run the middleware and the password would be stored wrong. Instead we use two promises as follows:
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    //Return the promise and the callback when the users are saved:
    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
