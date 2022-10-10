const express = require("express").Router;
const router = express();
const OrderControllerV2 = require("../../../controllers/Customer/v2/order");

/**
 * @swagger
 * /customer/v2/order:
 *   get:
 *     operationId: customerListOrdersV2
 *     summary: List orders
 *     description: List orders
 *     tags:
 *       - Customer / Order
 *     security:
 *      - CustomerAccessToken: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           format: int32
 *           example: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: number
 *           format: int32
 *           example: 10
 *     responses:
 *       200:
 *         description: Order listed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: number
 *                   format: int32
 *                   example: 1
 *                 pageSize:
 *                   type: number
 *                   format: int32
 *                   example: 10
 *                 pageCount:
 *                   type: number
 *                   format: int32
 *                   example: 100
 *                 count:
 *                   type: number
 *                   format: int32
 *                   example: 1000
 *                 orders:
 *                   allOf:
 *                     - $ref: "#/components/schemas/Order"
 *                     - type: object
 *                       properties:
 *                         User:
 *                           $ref: "#/components/schemas/User"
 *                         Car:
 *                           $ref: "#/components/schemas/Car"
 */
router.get("/", OrderControllerV2.getOrders);

module.exports = router;
