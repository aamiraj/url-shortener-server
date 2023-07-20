const express = require("express");
const app = express();
const cors = require("cors");
const productsRouter = require("./routes/products.route");
const brandRouter = require("./routes/brand.route");
const storeRouter = require("./routes/store.route");
const categoryRouter = require("./routes/category.route");
const stockRouter = require("./routes/stock.route");
const userRouter = require("./routes/user.route");

app.use(express.json());
app.use(cors());

//main function definition
async function main() {
  try {
    app.get("/", (req, res) => {
      res.send("Route is working! YaY!");
    });

    //route for products
    app.use("/api/v1/products", productsRouter);

    //route for brands
    app.use("/api/v1/brands", brandRouter);

    //route for stores
    app.use("/api/v1/store", storeRouter);

    //route for category
    app.use("/api/v1/categories", categoryRouter);

    //route for stock
    app.use("/api/v1/stock", stockRouter);

    //route for user
    app.use("/api/v1/user", userRouter);

  } catch (error) {
    console.log(error);
  }
}

//main function invoke
main().catch((error) => console.log(error));

module.exports = app;
