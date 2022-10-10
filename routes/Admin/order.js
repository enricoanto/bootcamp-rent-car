const express = require("express").Router;
const router = express();
const authentication = require("../../middlewares/authentication");
const OrderController = require("../../controllers/Admin/order");

/**
 * @swagger
 * /admin/order:
 *   get:
 *     description: List Orders
 *     deprecated: true
 *     summary: List Orders
 *     operationId: adminListOrders
 *     security:
 *       - AdminAccessToken: []
 *     tags:
 *       - Admin / Order
 *     responses:
 *       200:
 *         description: Order listed.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                 - $ref: "#/components/schemas/Order"
 *                 - type: object
 *                   properties:
 *                     User:
 *                       $ref: "#/components/schemas/User"
 *                     Car:
 *                       $ref: "#/components/schemas/Car"
 */
router.get("/", OrderController.getOrders);

/**
 * @swagger
 * /admin/order/reports:
 *   get:
 *     description: List daily order reports per month
 *     summary: List daily order reports per month
 *     operationId: adminListDailyOrderReportsPerMonth
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: 2022-01-01
 *       - in: query
 *         name: until
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: 2022-01-31
 *     security:
 *       - AdminAccessToken: []
 *     tags:
 *       - Admin / Order
 *     responses:
 *       200:
 *         description: Reports retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: 2022-01-01
 *                   orderCount:
 *                     type: number
 *                     format: int32
 *                     example: 1
 *
 */
router.get(
  "/reports",
  authentication.serverAuth,
  OrderController.getReportPerMonth
);

/**
 * @swagger
 * /admin/order/{id}:
 *   get:
 *     description: Get Order
 *     summary: Get Order
 *     operationId: adminGetOrder
 *     security:
 *       - AdminAccessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           format: int32
 *     tags:
 *       - Admin / Order
 *     responses:
 *       200:
 *         description: Order retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *               - $ref: "#/components/schemas/Order"
 *               - type: object
 *                 properties:
 *                   User:
 *                     $ref: "#/components/schemas/User"
 *                   Car:
 *                     $ref: "#/components/schemas/Car"
 */
router.get("/:id", OrderController.getOrderById);

/**
 * @swagger
 * /admin/order/{id}:
 *   patch:
 *     description: Change Order Status
 *     summary: Change Order Status
 *     operationId: adminChangeOrderStatus
 *     security:
 *       - AdminAccessToken: []
 *     tags:
 *     - Admin / Order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: The car ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: integer
 *                 description: 0 or 1
 *                 example: 1
 *     responses:
 *       200:
 *         description: Order status updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
 *       404:
 *         description: Order not found
 */
router.patch("/:id", OrderController.changeStatus);

/**
 * @swagger
 * /admin/order/{id}:
 *   delete:
 *     operationId: adminDeleteOrder
 *     description: Delete Order
 *     summary: Delete Order
 *     security:
 *       - AdminAccessToken: []
 *     tags:
 *       - Admin / Order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Car Id
 *     responses:
 *       200:
 *         description: Order deleted
 *       404:
 *         description: Order not found
 */
router.delete("/:id", OrderController.deleteOrder);

module.exports = router;
