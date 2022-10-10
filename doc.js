const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Binar Car Rental",
      version: "1.0",
    },
    servers: [{ url: process.env.URL_SERVERS }],
    components: {
      securitySchemes: {
        AdminAccessToken: {
          type: "apiKey",
          in: "header",
          name: "access_token",
        },
        CustomerAccessToken: {
          type: "apiKey",
          in: "header",
          name: "access_token",
        },
      },
    },
  },
  apis: ["./routes/**/*.js", "./models/**/*.js"],
};
const swaggerDocs = swaggerJsdoc(options);

module.exports = swaggerDocs;
