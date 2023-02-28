import jwt from "jsonwebtoken";
const userVerification = async (req, res, next) => {
  // here is way to catch token provided into the header of the request
  const authHeader = req.headers.authorization;
  // here is grabbing token that are in header
  const token = authHeader.split(" ")[1];

  if (!authHeader) {
    return res.status(401).json({
      message: "no token provided",
    });
  } else {
    // HERE is way to verify token that in header by extracting and return object with userid in token
    // { userId: '63fbd140eb762f9f8e37ef23', iat: 1677491312 }

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyToken);
    if (!verifyToken) {
      return res.status(401).json({ message: "invalid token" });
    } else {
      // grabing user id from token
      const { role } = verifyToken;

      if (role !== "user") {
        return res.status(403).json({ message: "UNAUTHORIZED" });
      }
      next();
    }
  }
};

export default userVerification;
