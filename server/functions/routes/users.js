const router = require("express").Router();
const admin = require("firebase-admin");

router.get("/", (req, res) => {
  return res.send("inside the user touter");
});

// verification jwt and return user data

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

router.get("/all", async (req, res) => {
  try {
    admin
      .auth()
      .listUsers()
      .then((listuserresult) => {
        let data = [];
        listuserresult.users.forEach((rec) => {
          data.push(rec.toJSON());
        });

        return data;
      })
      .then((data) => {
        return res
          .status(200)
          .send({ success: true, data: data, dataCount: data.length });
      })
      .catch((er) => console.log(er));
  } catch (er) {
    return res.send({
      success: false,
      msg: `Error in listing users :,${er}`,
    });
  }
});

module.exports = router;
