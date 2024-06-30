import jwt from "jsonwebtoken";
import CustomError from "../error/custom-error.js";

const jwtVerify = () => async (req, res, next) => {
  const token = req.headers["x-auth-token"];

  if (!token) {
    throw new CustomError("No token provided, authorization denied", 401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
    if (err) {
      if (process.env.NODE_ENV === "development") {
        err.statusCode = 401;
        return next(err);
      }
      throw new CustomError("Invalid JWT, authorization denied", 401);
    }

    req.jwtPayload = decodedPayload;
    next();
  });
};

export default jwtVerify;
