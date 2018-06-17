//We use the object destructuring to pull out a varible from the library:
const {SHA256} = require('crypto-js');

//To make an authentication easy, we use the 'jsonwebtoken' library:
const jwt = require('jsonwebtoken');

//For password hashing, we use the 'bcryptjs' library:
const bcrypt = require('bcryptjs');

var password = '123abc!';

//Example for password hashing. The 'genSalt' method is used to avoid hacking. It takes two arguments: first the step number, second the callback:
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   })
// });

//To compare if the hashed password corresponds to the original password:
var hashedPassword = '$2a$10$MaWjwa2pN/r.YGxRBZbdReOLhfG3ulA0Vl7xfUhohx89Tde9Y80Au';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id: 4
// };
// var token = {
//   data,
//   //We add a 'somesecret' string to avoid data manipulation:
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// //data manipulation with a change in the id property:
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not trust!');
// }

//JWT token generation:
// var data = {
//   id: 10
// };
// //To encode the token:
// var token = jwt.sign(data, '123abc');
// console.log(token);
//
// //To decode the token:
// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);
