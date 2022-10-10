const express = require("express").Router;
const router = express();
const CarControllerV2 = require("../../../controllers/Customer/v2/car");

/**
 * @swagger
 * /customer/v2/car:
 *   get:
 *     operationId: customerListCarsV2
 *     description: List cars
 *     summary: List cars
 *     tags:
 *       - Customer / Car
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *           example: Innova
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum:
 *             - small
 *             - medium
 *             - large
 *       - in: query
 *         name: isRented
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *           format: uint32
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *           format: uint32
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
 *         description: Car listed
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
 *                 cars:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Car"
 */
router.get("/", CarControllerV2.getCars);

module.exports = router;
