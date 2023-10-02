const router = require("express").Router();
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);
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

router.post("/subcrible", (req, res) => {
  const userEmail = req.body.email;
  console.log(userEmail);

  const msg = {
    to: userEmail, // Change to your recipient
    from: "huydqfx17618@funix.edu.vn", // Change to your verified sender
    subject: "Test sending Voucher code",
    text: "asdasdasd",
    html: "<strong>NUHENMS</strong>",
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
      return res.status(200).send({ response });
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
