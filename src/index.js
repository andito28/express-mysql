const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const userRoutes = require("./routes/users");
const middlewareLogRequest = require("./middleware/logs");

app.use(middlewareLogRequest);
app.use(express.json());

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`server berhasil di running di port ${PORT} `);
});
