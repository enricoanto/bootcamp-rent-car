if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes");
const cors = require("cors");
require("dotenv").config();
const swaggerUI = require("swagger-ui-express");
const fileUpload = require("express-fileupload");
const swaggerDocs = require("./doc");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/docs.json", (req, res) => res.json(swaggerDocs));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.status(200).json({
    name: true,
    message: "Welcome!",
  });
});

app.use(fileUpload());
app.use(router);

app.listen(port, () => {
  console.log(`app listen on port ${port}`);
});
module.exports = app;
