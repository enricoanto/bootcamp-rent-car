const express = require("express").Router;
const router = express();
const OrderController = require("../../controllers/Customer/order");
const authentication = require("../../middlewares/authentication");

/**
 * @swagger
 * /customer/order:
 *   post:
 *     summary: Create new order
 *     description: Create new order
 *     operationId: customerCreateOrder
 *     security:
 *       - CustomerAccessToken: []
 *     tags:
 *       - Customer / Order
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_rent_at:
 *                 type: string
 *                 description: start date YYYY-MM-DD
 *                 example: 2022-10-05
 *               finish_rent_at:
 *                 type: string
 *                 description: finish date YYYY-MM-DD
 *                 example: 2022-10-12
 *               car_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Order created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
 */
router.post("/", OrderController.addOrder);

/**
 * @swagger
 * /customer/order:
 *   get:
 *     summary: List orders
 *     description: List orders
 *     operationId: customerListOrders
 *     deprecated: true
 *     security:
 *       - CustomerAccessToken: []
 *     tags:
 *       - Customer / Order
 *     responses:
 *       200:
 *         description: Order listed.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: "#/components/schemas/Order"
 *                   - type: object
 *                     properties:
 *                       User:
 *                         $ref: "#/components/schemas/User"
 *                       Car:
 *                         $ref: "#/components/schemas/Car"
 */
router.get("/", OrderController.getOrders);

/**
 * @swagger
 * /customer/order/{id}:
 *   get:
 *     summary: Get order
 *     description: Get order
 *     operationId: customerGetOrder
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           format: int32
 *           example: 1
 *     security:
 *       - CustomerAccessToken: []
 *     tags:
 *       - Customer / Order
 *     responses:
 *       200:
 *         description: Order retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/Order"
 *                 - type: object
 *                   properties:
 *                     User:
 *                       $ref: "#/components/schemas/User"
 *                     Car:
 *                       $ref: "#/components/schemas/Car"
 */
router.get("/:id", OrderController.getOrderById);

/**
 * @swagger
 * /customer/order/{id}/slip:
 *   put:
 *     summary: Upload payment slip
 *     description: Upload payment slip
 *     operationId: customerUploadPaymentSlip
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           format: int32
 *           example: 1
 *     security:
 *       - CustomerAccessToken: []
 *     tags:
 *       - Customer / Order
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               slip:
 *                 type: string
 *                 format: binary
 *                 description: Payment slip file
 *                 example: screenshot.png
 *     responses:
 *       200:
 *         description: Order retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
 */
router.put("/:id/slip", OrderController.uploadSlipOrder);

/**
 * @swagger
 * /customer/order/{id}:
 *   put:
 *     summary: Update order
 *     description: Update order
 *     deprecated: true
 *     operationId: customerUpdateOrder
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           format: int32
 *           example: 1
 *     security:
 *       - CustomerAccessToken: []
 *     tags:
 *       - Customer / Order
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_rent_at:
 *                 type: string
 *                 description: start date YYYY-MM-DD
 *                 example: 2022-10-05
 *               finish_rent_at:
 *                 type: string
 *                 description: finish date YYYY-MM-DD
 *                 example: 2022-10-12
 *               car_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Order retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
 */
router.put("/:id", OrderController.updateOrder);

/**
 * @swagger
 * /customer/order/{id}:
 *   delete:
 *     summary: Delete order
 *     description: Delete order
 *     operationId: customerDeleteOrder
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           format: int32
 *           example: 1
 *     security:
 *       - CustomerAccessToken: []
 *     tags:
 *       - Customer / Order
 *     responses:
 *       200:
 *         description: Order deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Delete success"
 *                 message:
 *                   type: string
 *                   example: "Order with id = 1 has been delete"
 */
router.delete("/:id", OrderController.deleteOrder);

module.exports = router;
