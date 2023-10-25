const authModel = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    if (checkUser.length > 0) {
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
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authModel.checkUser(email);

    if (user.length < 1) {
      return res.json({
        message: "Incorrect email",
      });
    }

    const match = await bcrypt.compare(password, user[0].password);
    if (!match) {
      return res.json({
        message: "Incorrect password",
      });
    }

    const userId = user[0].id;
    const name = user[0].name;

    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15s",
      }
    );

    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    //update refresh token
    await authModel.updateToken(userId, refreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

//REFRESH TOKEN
const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await authModel.refreshToken(refreshToken);
    if (!user[0]) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decode) => {
        if (err) return res.sendStatus(403);
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign(
          { userId, name, email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await authModel.refreshToken(refreshToken);
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await authModel.updateToken(userId, null);
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
};
