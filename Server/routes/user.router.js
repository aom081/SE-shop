const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model");
const swaggerJSDoc = require("swagger-jsdoc");
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const users = await UserModel.findById(req.params.id);
  } catch (error) {
    return res.status(404).json({ message: "No user." });
  }

  if (!users) {
    return res.status(404).json({ message: "The user id is not valid." });
  }
  res.json(users);
});

router.post("/", async (req, res) => {
  const users = req.body;
  try {
    const existingUser = await UserModel.findOne({
      email: users.email,
    });
    // If there is no item in the database with that id then create a new one.
    if (existingUser) {
      return res.status(302).json({message: "User already exists"});
    } if (!existingUser) {
      req.body.photoURL = `https://robohash.org/${Math.random()}.png?set=set1&size=60x60`;
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const user = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "No User with that ID was found." });
    }
    res.status(200).json({ message: "User has been removed!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

//Check if a user is an  admin or the user making the request
router.get("/admin/:email", verifyToken,verifyAdmin, async (req,res) => {
    try {
        const {email} = req.params;
        const user = await UserModel.findOne({email})
        let isAdmin = false;
        if (user.role === "admin") {
            isAdmin = true;
        }
        res.json({isAdmin});
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})

//change  user to Admin role
//function path is chang someone 
router.patch("/make-admin/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAdmin = await UserModel.findByIdAndUpdate(
      id,
      {
        role: "user",
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Chang Admin to user role
router.patch("/make-admin/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        role: "user",
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
