var mongoose = require('mongoose');

//Model creation with their different properties. First argument is the model name and second is the properties:
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    //Validators:
    required: true,
    minlength: 1,
    trim: true //deletes the extra spaces at the beginning and end of the string
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {
    //We need to access the 'ObjectId' mongoose and mongodb type property:
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = {Todo};

//Creation of a new document:
// var newTodo = new Todo({
//   text: 'Cook dinner'
// });
//
// //Document saving in 'Todo' collection:
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save todo');
// });

//Creation of another document:
// var otherTodo = new Todo({
//   text: '  Walk the  dog  ',
// });
//
// //Document saving in 'Todo' collection:
// otherTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save todo', e);
// });
