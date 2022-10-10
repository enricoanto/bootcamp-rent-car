const express = require("express").Router;
const router = express();
const routerUser = require("./user");
const routerOrder = require("./order");
const routerOrderV2 = require("./v2/order");
const routerCarV2 = require("./v2/car");
const authentication = require("../../middlewares/authentication");

router.use("/auth", routerUser);
router.use("/order", authentication.clientAuth, routerOrder);
router.use("/v2/order", authentication.clientAuth, routerOrderV2);
router.use("/v2/car", routerCarV2);

module.exports = router;
