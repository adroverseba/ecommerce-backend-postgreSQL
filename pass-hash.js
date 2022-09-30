const bcrypt = require('bcrypt');

async function hashPassword() {
  const saltRounds = 10;
  const myPlaintextPassword = 's0/P4$$w0rD';

  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(myPlaintextPassword, salt);

  // const myPassword = 'password adr 623';
  // const hash = await bcrypt.hash(myPassword, 10);
  console.log(salt);
  console.log(hash);
}

hashPassword();

// $2b$10$nMYKnWoR5M1TMSngkYVkO.xFVEn0FdDbdFMbWcIc / W888o0lb7kZC;
