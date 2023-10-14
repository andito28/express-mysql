const getUsers = (req, res) => {
  res.json({
    message: "get all users ",
  });
};

const createNewUser = (req, res) => {
  res.json({
    message: "create new user",
  });
};

module.exports = { getUsers, createNewUser };
