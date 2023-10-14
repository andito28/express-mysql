const express = require("express");
const app = express();

const userRoutes = require("./routes/users");

app.use("/users", userRoutes);

app.listen(4000, () => {
  console.log("server berhasil di running di port 4000 ");
});
