/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      required:
 *          - name
 *          - price
 *          - description
 *          - image
 *          - category
 *      properties:
 *          name:
 *              type: string
 *              description: The name of the product
 *          price:
 *              type: number
 *              description: The price of the Product
 *          description:
 *              type: string
 *              description: The description of the product
 *          image:
 *              type: string
 *              description: The image of the product
 *          category:
 *              type: string
 *              description: The category of the product
 *      example:
 *          name:"iPhone"
 *          price:1000.99
 *          description:"This is a iPhone."
 *          image:"https://image.com/iphone.jpg"
 *          category:"Electronics"
 * tags:
 *  name:Products
 *  description: The Products managing API
 */
const express = require("express");
const router = express.Router();
const ProductModel = require("../models/Product.model");
const swaggerJSDoc = require("swagger-jsdoc");

/**
 * @swagger
 * /products:
 *  get:
 *      summary: Retrieve a list of product.
 *      tag: [Products]
 *      responses:
 *          200:
 *              description: A list of product.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: "#/components/schemas/Product"
 */
router.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /product/{id}:
 *   get:
 *       summary: Get the information about a specific product using its id.
 *       tags: [Products]
 *       parameters:
 *           -   in: path
 *               name: id
 *               required: true
 *               schema:
 *                   type: string
 *               description: Invalid ID entered.
 *       responses:
 *           200:
 *               description: The product was returned successfully.
 *               content:
 *                   application/json:
 *                       schema:
 *                           type: array
 *                           items:
 *                               $ref: "#/components/schemas/Product"
 *           404:
 *               description: No product with that ID exists.
 *           500:
 *               description: Server Error.
 */
router.get("/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
  } catch (error) {
    return res.status(404).json({ message: "No product." });
  }

  if (!product) {
    return res.status(404).json({ message: "The product id is not valid." });
  }
  res.json(product);
});

/**
 *@swagger
 * /products:
 *   post:
 *       summary: Update a product by its ID.
 *       tags:[Product]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *                $ref: "#/components/schemas/UpdateProduct"
 *       responses:
 *           201:
 *              description: The product has been updated.
 *              content:{
 *                  application/json:
 *                      schema:
 *                          $ref:#/components/schemas/Product
 *              }
 *           400:
 *              description: Bad Request.
 *           500:
 *               description: Internal server error.
 */
router.post("/", async (req, res) => {
  const newProduct = new ProductModel(req.body);

  try {
    const product = await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *      summary: Delete product by id.
 *      tag[Products]
 *      parameters:
 *          -   name : "id"
 *              in : "path"
 *              description: "The unique identifier for  a product."
 *              required : true
 *              schema:
 *                  type : "string"
 *              
 *      responses:
 *          200:
 *              description: Successfully deleted the product.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref:'#/components/schemas/Product'
 *          404:
 *              description: Product not found.
 *          500:
 *              description: Server error.
*/

router.delete("/:id", getProductById, (req, res) => {
  // delete the product from database using req.product object from middleware function
  req.product
    .remove()
    .then(() => {
      res.json({ message: "Deleted product." });
    })
    .catch((error) => {
      res.status(500).json({ message: "Could not delete product." });
    });
});

/**
 * @swagger
 * /product/{id}:
 *   put:
 *       summary: Update product.
 *       tags: [Products]
 *       parameters:
 *           -   in: path
 *               name: id
 *               required: true
 *               schema:
 *                   type: string
 *               description: Invalid ID entered.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/UpdateProduct"
 *       responses:
 *           200:
 *               description: The product was returned successfully.
 *               content:
 *                   application/json:
 *                       schema:
 *                           type: array
 *                           items:
 *                               $ref: "#/components/schemas/Product"
 *           404:
 *               description: No product with that ID exists.
 *           500:
 *               description: Server Error.
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const product = await ProductModel.findByIdAndUpdate(id, data, { new: true });
    if (!product) {
      return res
        .status(404)
        .json({ message: "Cannot find a product with this id!" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
