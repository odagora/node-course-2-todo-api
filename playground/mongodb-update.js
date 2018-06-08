//Require the node mongodb native library:
// const MongoClient = require('mongodb').MongoClient;

//If we use the object destructuring we can do as follows and pull extra data from the mongodb library:
const {MongoClient, ObjectID} = require('mongodb');

//Create a connection to the database. It takes two arguments: first the url and second the callback:
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
  //We handle first the errors. When we return the console.log message we prevent to continue the code execution if an error occurs in this case:
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  //To update a document in the 'Todos' collection:
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5b19c467500cac9a70cd5266')
  // }, {
  //   //We use the '$set' update operator as seen in 'https://docs.mongodb.com/manual/reference/operator/update/':
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   //We use the 'returnOriginal' value to 'false' as the last argument of the 'findOneAndUpdate' method:
  //     returnOriginal:false
  //   }).then((result) => {
  //     console.log(result);
  //   });

  //To update a document in the 'Users' collection:
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5b19c23f500cac9a70cd51f9')
  }, {
    $set: {
      name: 'Daniel'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  //Close the connection:
  // db.close();
});
