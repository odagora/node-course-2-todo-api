//Require the node mongodb native library:
// const MongoClient = require('mongodb').MongoClient;

//If we use the object destructuring we can do as follows and pull extra data from the mongodb library:
const {MongoClient, ObjectID} = require('mongodb');
//Make a new variable with an ObjectID instance and print it to the terminal:
var obj = new ObjectID();
//This prints a random '_id' field each time the code runs:
console.log(obj);

// //Object destructuring example:
// var user = {name: 'Daniel', age:25};
// //We write into curly brackets the key of the value we want to convert to a variable and set equal to the original variable:
// var {name} = user;
// //Print out the result to check:
// console.log(name);

//Create a connection to the database. It takes two arguments: first the url and second the callback:
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
  //We handle first the errors. When we return the console.log message we prevent to continue the code execution if an error occurs in this case:
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // //Begin to insert a document in 'Todos' collection. In mongoDB we don't need to create the db, it's created automatically when data has been inserted:
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   //The 'ops' attribute stores all of the docs that were inserted. In the above case, we used 'insertOne':
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  //Insert new document into Users collection:
  db.collection('Users').insertOne({
    name: 'Daniel',
    age: 35,
    location: 'Bogota'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert user', err);
    }
    // console.log(JSON.stringify(result.ops, undefined, 2));
    // To print for example the _id field:
    console.log(result.ops[0]._id);
    //To extract the timestamp from the _id by default created by mongodb:
    console.log(result.ops[0]._id.getTimestamp());
  });

  //Close the connection:
  db.close();
});
