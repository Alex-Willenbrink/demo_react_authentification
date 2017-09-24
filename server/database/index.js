// Package to generate user tokens
const jwt = require("jsonwebtoken");

// initialize database
const _database = [];

const addUser = (email, password) => {
  if (!email || !password)
    throw new Error("Something wrong with username or password");
  _database.push({ email, password });
};

const validateUser = (email, password) => {
  const user = _database.find(user => user.email === email);
  if (!user) throw new Error("User not found in database");
  if (user.password !== password) throw new Error("Password does not match");
};

const generateUserToken = (email, password) => {
  // Make sure email and password are in database
  const user = _database.find(user => {
    return user.email === email;
  });

  if (!user) throw new Error(`No user in database with email: "${email}"`);

  if (user.password !== password)
    throw new Error(`"${password}" is incorrect for "${email}"`);

  const token = jwt.sign({ email }, "SECRET_SECRETS", { expiresIn: "1d" });
  return token;
};

const validateUserToken = token => {
  return jwt.verify(token, "SECRET_SECRETS");
};

module.exports = {
  addUser,
  generateUserToken,
  validateUserToken,
  validateUser
};
