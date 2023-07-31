const express = require("express");
const express_app = express();
const cors = require("cors");
const userRouter = require("./routes/user.route");
const shortUrlRouter = require("./routes/shortUrl.route");
const { getUrl } = require("./controllers/shortUrl.controller");

express_app.use(express.json());
express_app.use(cors());

//main function definition
async function main() {
  try {
    express_app.get("/", (req, res) => {
      res.send("Route is working! YaY!");
    });

    // route for short url
    express_app.use("/api/v1/short-url", shortUrlRouter);
    express_app.use("/:id", getUrl);


    //route for user
    express_app.use("/api/v1/user", userRouter);
  } catch (error) {
    console.log(error);
  }
}

//main function invoke
main().catch((error) => console.log(error));

module.exports = express_app;
