

const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    console.log(authorizationHeader);

    if (!authorizationHeader) {
      return res.status(401).json({ message: "Authentication token missing" });
    }

    const token = authorizationHeader.split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET_KEY, (error, decodedToken) => {
      if (error) {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      } else {
        req.body.userId = decodedToken.userId;
        next();
      }
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "Authentication error",
      error: error,
    });
  }
};

