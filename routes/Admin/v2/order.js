const express = require("express").Router;
const router = express();
const OrderControllerV2 = require("../../../controllers/Admin/v2/order");

/**
 * @swagger
 * /admin/v2/order:
 *   get:
 *     operationId: adminListOrdersV2
 *     summary: List Orders
 *     description: List Orders
 *     tags:
 *       - Admin / Order
 *     security:
 *      - AdminAccessToken: []
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - user_email:asc
 *             - user_email:desc
 *             - car_name:asc
 *             - car_name:desc
 *             - category:asc
 *             - category:desc
 *             - price:asc
 *             - price:desc
 *             - created_at:asc
 *             - created_at:desc
 *             - updated_at:asc
 *             - updated_at:desc
 *             - start_rent_at:asc
 *             - start_rent_at:desc
 *             - finish_rent_at:asc
 *             - finish_rent_at:desc
 *           example: created_at:desc
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
