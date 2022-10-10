const express = require("express").Router;
const router = express();
const routerUser = require("./user");
const routerCar = require("./car");
const routerOrder = require("./order");
const routerCarV2 = require("./v2/car");
const routerOrderV2 = require("./v2/order");
const authentication = require("../../middlewares/authentication");

router.use("/auth", routerUser);
router.use("/car", authentication.serverAuth, routerCar);
router.use("/order", authentication.serverAuth, routerOrder);
router.use("/v2/car", authentication.serverAuth, routerCarV2);
router.use("/v2/order", authentication.serverAuth, routerOrderV2);

module.exports = router;
