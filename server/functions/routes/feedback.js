const router = require("express").Router();
const admin = require("firebase-admin");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const db = admin.firestore();

//create feedback

//function helper add star
const addRating = async (id, rating) => {
  const productRef = db.collection("products").doc(`/${id}/`);

  const unionStar = await productRef.update({
    rating: FieldValue.arrayUnion(rating),
  });
};

router.post("/create", async (req, res) => {
  try {
    const feedbackId = Date.now();
    const productId = req.body.product_id;
    const data = {
      rating: req.body.rating,
      message: req.body.message,
    };

    addRating(productId, req.body.rating);

    const response = await db
      .collection("feedbacks")
      .doc(`/${productId}/`)
      .collection(`Feed-${productId}`)
      .doc(`/${feedbackId}/`)
      .set({ data });

    return res.status(200).send({ succes: true, data: response });
  } catch (error) {
    res.send({ succes: false, message: `${error}` });
  }
});

// get feed back

router.get("/get/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    const query = db
      .collection("feedbacks")
      .doc(`/${productId}/`)
      .collection(`Feed-${productId}`);

    let response = [];

    await query.get().then((querySnap) => {
      let docs = querySnap.docs;

      docs.map((doc) => response.push({ ...doc.data() }));
      return res;
    });
    return res.status(200).send({ succes: true, data: response });
  } catch (error) {
    return res.send({ success: false, msg: `Error :${error}` });
  }
});

module.exports = router;
