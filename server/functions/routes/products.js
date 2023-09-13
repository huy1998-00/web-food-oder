const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();

// create product
router.post("/create", async (req, res) => {
  try {
    const id = Date.now();
    const data = {
      product_id: id,
      product_name: req.body.product_name,
      product_Category: req.body.product_Category,
      product_price: req.body.product_price,
      imageURL: req.body.imageURL,
    };
    const response = db.collection("products").doc(`/${id}/`).set(data);
    return res.status(200).send({ succes: true, data: response });
  } catch (error) {
    return res.status(500).send({ succes: false, msg: error });
  }
});

// get all products
router.get("/all", async (req, res) => {
  try {
    let query = db.collection("products");
    let response = [];
    await query.get().then((querysnap) => {
      let docs = querysnap.docs;
      docs.map((doc) => {
        response.push({ ...doc.data() });
      });
      return response;
    });
    return res.status(200).send({ success: true, data: response });
  } catch (err) {
    return res.send({ success: false, msg: `Error :${err}` });
  }
});

//delete product

router.delete("/delete:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    db.collection("products").doc(`/${productId}/`).delete();
  } catch (error) {
    return res.send({ success: false, msg: `Error :${err}` });
  }
});

module.exports = router;
