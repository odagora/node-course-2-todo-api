//Import express and body-parser libraries:
var express = require('express');
var bodyParser = require('body-parser');

//Use of object destructuring ES6 to pull data as variables:
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

//Use of body-parser middleware:
app.use(bodyParser.json());

//Routes definition using the 'post' express method:
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//Setting up the express server:
app.listen(3000, () => {
  console.log('Started on port 3000')
});

//Export the express server for testing:
module.exports = {app};
