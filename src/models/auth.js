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
      return rows;
    })
    .catch((error) => {
      throw error;
    });
};

const updateToken = (id, token) => {
  const query = "UPDATE users SET refresh_token = ? WHERE id = ?";
  const value = [token, id];
  return dbPool.execute(query, value);
};

const refreshToken = (token) => {
  const query = "SELECT * FROM users WHERE refresh_token = ?";
  const value = [token];
  return dbPool
    .execute(query, value)
    .then(([rows]) => {
      return rows;
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  registerUser,
  checkUser,
  updateToken,
  refreshToken,
};
