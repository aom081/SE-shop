/**
 * @swagger
 * components:
 *  schemas:
 *    cart:
 *      type: object
 *      required:
 *          - productId
 *          - name
 *          - email
 *          - price
 *          - image
 *          - quantity
 *      properties:
 *          productId:
 *              type: string
 *              description: The properties of the Product
 *          name:
 *              type: string
 *              description: The name of the Product
 *          email:
 *              type: string
 *              description: The email of the Product
 *          price:
 *              type: number
 *              description: The price of the Product
 *          image:
 *              type: string
 *              description: The image of the Product
 *          quantity:
 *              type: string
 *              description: The quantity of the Product
 *      example:
 *          productId: "1"
 *          name:"iPhone"
 *          price:1000.99
 *          email: "john@gmail.com"
 *          image:"https://image.com/iphone.jpg"
 *          quantity: 2
 * tags:
 *  name:cart
 *  description: The Carts managing API
 */
const express = require("express");
const router = express.Router();
const CartModel = require("../models/Cart.model");
const swaggerJSDoc = require("swagger-jsdoc");

/**
 * @swagger
 * /cart:
 *  get:
 *      summary: Retrieve a list of Carts.
 *      tag: [Carts]
 *      responses:
 *          200:
 *              description: A list of Carts.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: "#/components/schemas/Cart"
 *          500:
 *              description: Some error happened
 */
router.get("/", async (req, res) => {
  try {
    const carts = await CartModel.find();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /cart/{email}:
 *   get:
 *       summary: Get the information about a specific product using its id.
 *       tags: [cart]
 *       parameters:
 *           -   in: path
 *               name: email
 *               required: true
 *               schema:
 *                   type: string
 *               description: Invalid email entered.
 *       responses:
 *           200:
 *               description: The product was returned successfully.
 *               content:
 *                   application/json:
 *                       schema:
 *                           type: array
 *                           items:
 *                               $ref: "#/components/schemas/Cart"
 *           404:
 *               description: No product with that email exists.
 *           500:
 *               description: Server Error.
 */
router.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    console.log(email);
    const carts = await CartModel.find({ email });
    if (!carts) {
      res.status(404).json({ message: "No carts found." });
    }
    res.json(carts);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

/**
 *@swagger
 * /cart:
 *   post:
 *       summary: Add a product to the cart.
 *       tags:[cart]
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
  const newCart = new CartModel(req.body);

  try {
    const existingCarts = await CartModel.findOne({ productId: carts.productId, email:carts.email });
    // If there is no item in the database with that id then create a new one.
    if (existingCarts) {
       existingCarts.quantity += newCart.quantity;
       await existingCarts.save();
       return res.status(200).json(cart);
    } else {
      const newCart = new CartModel(cart);
      await newCart.save();
      res.status(201).json(newCart); 
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//put cart
/**
 * @swagger
 * /cart/{id}:
 *   put:
 *     summary: Update an existing cart by Id.
 *     tags: [Cart]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       400:
 *          description: Bad request.
 *       404: 
 *          description: Cart not found.
 *       200:
 *          description: The cart has been updated.
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const cart = await CartModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!cart) {
      return res
        .status(404)
        .json({ message: "Cannot find a cart with this id!" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete cart
/**
 *   @swagger
 * /carts/{id}:
 *     delete:  
 *       summary: Delete the cart by its ID
 *       tags: [Carts]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           type: string
 *       responses:   
 *         "401":
 *           $ref: '#/components/responses/Unauthorized'
 *         "404":
 *           description: Cart not found
 *         "200":
 *           description: The cart has been deleted.
 */

router.delete('/:id', async (req, res) => {
  try {
    const cart = await  CartModel.findByIdAndRemove(req.params.id);
    if (!cart) {
      return res
        .status(404)
        .json({ message: 'No cart with that ID was found.' })
    }
    res.status(200).json({ message: 'Cart has been removed!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
})

router.delete('/clear/:email', async (req,res)=>{
  try{
    const deleteCart = await  CartModel.deleteMany({ email });
    if(deleteCart.deletedCount === 0){
      return res.status(404).json({message: 'Empty cart'})
    } 
    res.status(200).send("All carts have been cleared")
  }catch(e){
    res.status(500).json({ message: error.message });   
  }  
});

module.exports = router;


