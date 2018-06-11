//We import the ObjectID property from the mongodb library:
const {ObjectID} = require('mongodb');

//We import mongoose library and todo model using the object destructuring ES6 functionality:
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

//First method to remove documents with mongoose. 'remove()' deletes all documents and doesn't return the object(s) to the user:
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

//Second method to remove documents with mongoose. 'findOneAndRemove()' finds and deletes the first match but the object is returned to the user:
// Todo.findOneAndRemove('5b1eb1e587165363e0bb59d2').then((result) => {
//   console.log(result);
// });

//Third method to remove documents with mongoose. 'findByIdAndRemove()' finds and deletes the first match by id but the object is returned to the user:
Todo.findByIdAndRemove('5b1eb25c87165363e0bb59f0').then((result) => {
  console.log(result);
});
