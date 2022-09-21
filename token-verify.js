const jwt = require('jsonwebtoken');

const secret = 'KenshinHimura';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY2MzYzMjUzOX0.jiNkL4vTK4zTW2sil7fUcqVsjBNvfZkbf2wpjpUwI3c';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
