const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'password adr 623';
  const hash = '$2b$10$UD2GRFtbkmXaJdgOjJWYaeOJZtOkTp2WuldxCvW8gGujw0xz33Zrq';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();

// $2b$10$UD2GRFtbkmXaJdgOjJWYaeOJZtOkTp2WuldxCvW8gGujw0xz33Zrq
// $2b$10$YyA13qqG9vkiYbRETCOJUuOlJ5DbRg9GjZ0GZ.09s14rxFSI26l6e
