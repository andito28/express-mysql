const getUsers = (req, res) => {
  const data = {
    id: "1",
    name: "andito",
    email: "andito763@gmail.com",
    address: "jln sermani 2",
  };
  res.json({
    message: "get all users ",
    data: data,
  });
};

const createNewUser = (req, res) => {
  console.log(req.body);
  res.json({
    message: "success create new user",
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  res.json({
    message: "update user success",
    data: data,
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  res.json({
    id: id,
    message: "delete user success",
  });
};

module.exports = {
  getUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
