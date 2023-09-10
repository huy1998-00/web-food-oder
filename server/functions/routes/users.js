const router = require("express").Router();
const admin = require("firebase-admin");
router.get("/", (req, res) => {
  return res.send("inside the user touter");
});

// verification jwt

router.get("/jwtVerification", async (req, res) => {
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
    return res
      .status(200)
      .json({ succes: true, msg: "Authorized access ", data: decodeToken });
  } catch (error) {
    //handle err

    res.status(500).send({
      succes: false,
      msg: error,
    });
  }
});

module.exports = router;
