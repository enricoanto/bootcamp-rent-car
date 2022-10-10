const { Car } = require("../../models");
const firebase = require("../../helpers/firebase");
require("dotenv").config();

class CarController {
  static async addCarr(req, res) {
    try {
      const { name, category, price, status } = req.body;
      var image_url;
      if (!req.files || Object.keys(req.files).length === 0) {
        image_url = null;
      } else {
        let image = req.files.image;
        let img_name = `${Number(new Date())}-${image.name}`;
        img_name = img_name.replace(/ /g, "_");
        image_url = `https://firebasestorage.googleapis.com/v0/b/${process.env.UPLOADURL}/o/cars%2F${img_name}?alt=media`;
        await firebase
          .file(`cars/${img_name}`)
          .createWriteStream()
          .end(req.files.image.data);
      }

      const data = await Car.create({
        name,
        category,
        price,
        status,
        image: image_url,
      });
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getCars(req, res) {
    try {
      const data = await Car.findAll();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getCarById(req, res) {
    console.log(req.params);
    try {
      const id = req.params.id;
      const car = await Car.findByPk(+id);
      res.status(200).json(car);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async editCar(req, res) {
    try {
      let image_url = "";
      if (!req.files || Object.keys(req.files).length === 0) {
        image_url = null;
      } else {
        let image = req.files.image;
        let image_name = `${Number(new Date())}-${image.name}`;
        image_name = image_name.replace(/ /g, "_");
        image_url = `https://firebasestorage.googleapis.com/v0/b/${process.env.UPLOADURL}/o/cars%2F${image_name}?alt=media`;
        await firebase
          .file(`cars/${image_name}`)
          .createWriteStream()
          .end(req.files.image.data);
      }

      const { name, category, price } = req.body;
      const id = req.params.id;
      const data = await Car.update(
        {
          name,
          category,
          price,
          image: image_url,
        },
        {
          where: {
            id,
          },
          returning: 1,
        }
      );
      if (data[0]) {
        res.status(200).json(data[1][0]);
      } else {
        res.status(400).json({
          name: "Not Found",
          message: `Car with id = ${id} is not Found`,
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deleteCar(req, res) {
    try {
      const id = req.params.id;
      const data = await Car.destroy({
        where: {
          id,
        },
      });
      if (data) {
        res.status(200).json({
          name: "Delete Success",
          message: `Car with id = ${id} has been delete`,
        });
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
