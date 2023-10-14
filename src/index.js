const express = require("express");
const app = express();

const userRoutes = require("./routes/users");

const middlewareLogRequest = require("./middleware/logs");

app.use(middlewareLogRequest);
app.use(express.json());

app.use("/users", userRoutes);

app.listen(4000, () => {
  console.log("server berhasil di running di port 4000 ");
});
