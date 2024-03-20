const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }
  const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
  // verifies secret and checks expiration
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." });
    }
    req.decoded = decoded;
    next();
  });
};
module.exports = verifyToken;
