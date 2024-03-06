const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ProductRouter = require( "./routes/productRoutes"); 
const cartRouter =require("./routes/cart.router")
const swaggerUi = require("swagger-ui-express");
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'RESTful API for SE Shop',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express for SE Shop',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Nattawut Keawmaha',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

//config .env
dotenv.config();
const app = express();
const CLIENT_URL =process.env.CLIENT_URL;
app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use(express.json());

//Database Connection
const MOMGODB_URI = process.env.MOMGODB_URI;
mongoose.connect(MOMGODB_URI);

app.get("/", (req, res) => {
    res.send("<h1>This is a RESTful API for SE Shop</h1>");
})

//Add Router
app.use("/products", ProductRouter);

//RUN Server
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
})

