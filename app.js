const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const userRoutes = require("./src/routes/users");
const authRoutes = require("./src/routes/auth");
const middlewareLogRequest = require("./src/middleware/logs");

app.use(middlewareLogRequest);
app.use(cors({ credentials: true, origin: "http://localhost::4000" }));
app.use(cookieParser());
app.use(express.json());

app.use(userRoutes);
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`server berhasil di running di port ${PORT} `);
});
