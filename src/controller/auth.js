const authModel = require("../models/auth");
const bcrypt = require("bcrypt");

//REGISTER
const register = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;

  if (!name || !email || !password || !confirm_password) {
    return res.status(402).json({
      message: "Input Invalid",
    });
  } else if (password != confirm_password) {
    return res.status(400).json({
      message: "password doesn't match",
    });
  }

  //hash password
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  //data request
  const dataRequest = {
    name: name,
    email: email,
    password: passwordHash,
  };

  try {
    //check email apakah sudah terdaftar atau belum
    const checkUser = await authModel.checkUser(email);
    if (checkUser == true) {
      return res.status(400).json({
        message: "Email has been registered",
      });
    }

    // create new user
    await authModel.registerUser(dataRequest);
    return res.status(201).json({
      message: "Success register user",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

//LOGIN

module.exports = { register };
