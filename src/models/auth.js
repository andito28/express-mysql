const dbPool = require("../config/database");

const registerUser = (req) => {
  const query = "INSERT INTO users (name,email,password) VALUES (?,?,?)";
  const values = [req.name, req.email, req.password];
  return dbPool.execute(query, values);
};

const checkUser = (email) => {
  const query = "SELECT * FROM users WHERE email = ?";
  const value = [email];
  return dbPool
    .execute(query, value)
    .then(([rows]) => {
      return rows.length > 0;
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  registerUser,
  checkUser,
};
