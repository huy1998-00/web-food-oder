const admin = require("firebase-admin");

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ msg: "Token not found" });
  }
  //get token
  const token = req.headers.authorization.split(" ")[1];
  try {
    //decode
    const decodeToken = await admin.auth().verifyIdToken(token);

    if (!decodeToken) {
      return res
        .status(500)
        .json({ succes: false, msg: "Unauthorized access " });
    }
    next();
  } catch (error) {
    //handle err

    res.status(500).send({
      succes: false,
      msg: error,
    });
  }
};
