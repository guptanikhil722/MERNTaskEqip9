import jwt from "jsonwebtoken"
import { authconfig } from "../config/auth.config.js";

const verifyToken = (req, res, next) => {
    let token = req.header("Authorization");
    console.log('token>>>', token)
    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }
  
    jwt.verify(token,
        authconfig.secret,
               (err, decoded) => {
                console.log('error>>', err)
                if (err) {
                  return res.status(401).send({
                    message: "Unauthorized!",
                  });
                }
                req.userId = decoded.id;
                next();
               });
  };

  export default verifyToken