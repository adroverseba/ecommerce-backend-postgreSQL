const bcrypt = require('bcrypt');

async function hashPassword() {
  const myPassword = 'password adr 623';
  const hash = await bcrypt.hash(myPassword, 10);
  console.log(hash);
}

hashPassword();

// $2b$10$nMYKnWoR5M1TMSngkYVkO.xFVEn0FdDbdFMbWcIc / W888o0lb7kZC;
