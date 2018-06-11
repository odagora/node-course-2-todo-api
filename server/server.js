//Import express and body-parser libraries:
var express = require('express');
var bodyParser = require('body-parser');

//Use of object destructuring ES6 to pull data as variables:
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');

var app = express();

//Setting up the port ready for localhost or Heroku:
const port = process.env.PORT || 3000;

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

//Route to get a 'Todos' list:
app.get('/todos', (req, res) => {
  //We use the same method for our server testing case:
  Todo.find().then((todos) => {
    //We send an object instead of an array:
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

//Route to GET an individual resource. We use the ':' followed by a name:
app.get('/todos/:id', (req, res) => {
  //The parameter passed is in 'req.params':
  // res.send(req.params);
  var id = req.params.id;
  //To validate the id before the query we use the ObjectID.isValid method:
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  //If the 'id' is valid, then 'findById':
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    //We send an object with the information writing it inside curly brackets '{}':
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

//Route to DELETE an individual resource:
app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

//Setting up the express server:
app.listen(port, () => {
  console.log(`Started on port ${port}`)
});

//Export the express server for testing:
module.exports = {app};
