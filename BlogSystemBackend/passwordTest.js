import bcrypt from 'bcrypt';

// Replace 'yourKnownPassword' with the actual password you expect to match
const testPassword = 'test'; 

// Replace this with the stored hash from your database
const storedHash = '$2b$10$UuD5WNkUfT7KXXhBL3Y7A.RsJW5zsbUJvCC./5SkhrSQKFOtM3pjG';

bcrypt.compare(testPassword, storedHash, (err, result) => {
  if (err) {
    console.error('Error comparing password:', err);
    return;
  }
  if (result) {
    console.log('Password match: success');
  } else {
    console.log('Password match: failed');
  }
});
