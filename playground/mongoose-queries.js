//We import the ObjectID property from the mongodb library:
const {ObjectID} = require('mongodb');

//We import mongoose library and todo model using the object destructuring ES6 functionality:
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

//We define a variable for an existing id of a document in the collection:
var id = '5b1d761c173f0acc30bbfb75';
var uid = '5b1ac43badd910e00a62880b';

//To validate the id before the query we use the ObjectID.isValid method:
if (!ObjectID.isValid(id)) {
  console.log('ID not valid');
}

//First mongoose find method. Used to find all the documents that matches the query:
Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
});

//Second mongoose find method. Used to find the first document that matches the query:
Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo', todo);
});

//Third mongoose find method. Used to find a document by id:
Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Todo Id not found');
  }
  console.log('Todo By Id', todo);
}).catch((e) => console.log(e));

User.findById(uid).then((user) => {
  if (!user) {
    return console.log('User Id not found');
  }
  console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log(e);
});
