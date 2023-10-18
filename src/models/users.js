const dbPool = require("../config/database");

const getAllUser = () => {
  const query = "SELECT * FROM users";
  return dbPool.execute(query);
};

module.exports = {
  getAllUser,
};
