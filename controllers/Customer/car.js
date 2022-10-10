const { Car } = require("../../models");

class CarController {
  static async getCars(req, res) {
    try {
      const data = await Car.findAll();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getCarById(req, res) {
    try {
      const id = req.params.id;
      const car = await Car.findByPk(id);
      if (car) {
        res.status(200).json(car);
      } else {
        res.status(404).json({
          name: "Not Found",
          message: `Car with id = ${id} is not Found`,
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = CarController;
