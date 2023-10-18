const userModel = require("../models/users");

const getUsers = async (req, res) => {
  try {
    const [data] = await userModel.getAllUser();
    res.json({
      message: "get all users ",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      serverMessage: error,
    });
  }
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
