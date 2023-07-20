const mongoose = require("mongoose");
require("dotenv").config();

function DBConnect() {
  mongoose
    .connect(process.env.DATABASE_LOCAL)
    .then(() => {
      console.log(`Database connection is successful.`.green.bold);
    })
    .catch((error) => console.log(`${error}`.red.bold));
}

module.exports = DBConnect;
