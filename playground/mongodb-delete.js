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

  //DeleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });
  //DeleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });
  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  //DeleteMany to remove duplicate documents with name repeted:
  // db.collection('Users').deleteMany({name: 'Daniel'}).then((result) => {
  //   console.log(result);
  // });

  //findOneAndDelete to remove a specific document by _id:
  db.collection('Users').findOneAndDelete({_id: new ObjectID('5b171c93d23bed27103d7368')}).then((result) => {
    console.log(result);
  });

  //Close the connection:
  // db.close();
});
