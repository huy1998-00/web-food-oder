const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const express = require("express");
// const endpointSecret = process.env.WEBHOOK_SECRET;

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

router.delete("/delete/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    await db
      .collection("products")
      .doc(`/${productId}/`)
      .delete()
      .then((result) => {
        return res.status(200).send({ success: true, data: result });
      });
  } catch (err) {
    return res.send({ success: false, msg: `Error :${err}` });
  }
});

// add product to cart
router.post("/addToCart/:userId", async (req, res) => {
  const userId = req.params.userId;
  const productId = req.body.product_id;
  try {
    const doc = await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${productId}/`)
      .get();

    if (doc.data()) {
      const quantity = doc.data().quantity + 1;
      const updatedItem = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .update({ quantity });
      return res.status(200).send({ success: true, data: updatedItem });
    } else {
      //chưa có thì thêm mới
      const data = {
        productId: productId,
        product_name: req.body.product_name,
        product_Category: req.body.product_Category,
        product_price: req.body.product_price,
        imageURL: req.body.imageURL,
        quantity: 1,
      };
      const addItems = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .set(data);
      return res.status(200).send({ success: true, data: addItems });
    }
  } catch (error) {
    return res.send({ success: false, msg: `Error :${error}` });
  }
});

//update cart items
router.post("/updateCart/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  const productId = req.query.productId;
  const type = req.query.type;

  try {
    const doc = await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${productId}/`)
      .get();
    //nếu có data
    if (doc.data()) {
      //type === increasement
      if (type === "increasement") {
        //tăng số lượng
        const quantity = doc.data().quantity + 1;
        const updatedItem = await db
          .collection("cartItems")
          .doc(`/${userId}/`)
          .collection("items")
          .doc(`/${productId}/`)
          .update({ quantity });
        return res.status(200).send({ success: true, data: updatedItem });
      } else {
        //type === decreasement
        if (doc.data().quantity === 1) {
          // nếu qty === 1 xóa
          await db
            .collection("cartItems")
            .doc(`/${userId}/`)
            .collection("items")
            .doc(`/${productId}/`)
            .delete()
            .then((result) => {
              return res.status(200).send({ success: true, data: result });
            });
        } else {
          //giảm qty
          const quantity = doc.data().quantity - 1;
          const updatedItem = await db
            .collection("cartItems")
            .doc(`/${userId}/`)
            .collection("items")
            .doc(`/${productId}/`)
            .update({ quantity });
          return res.status(200).send({ success: true, data: updatedItem });
        }
      }
    }
  } catch (error) {}
});

// get item in user cart

router.get("/getCartItems/:userId", async (req, res) => {
  const userId = req.params.userId;

  (async () => {
    try {
      let query = db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items");

      let response = [];

      await query.get().then((querySnap) => {
        let docs = querySnap.docs;

        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return res;
      });

      return res.status(200).send({ succes: true, data: response });
    } catch (error) {
      return res.send({ success: false, msg: `Error :${error}` });
    }
  })();
});

// create checkout session
router.post("/create-checkout-session", async (req, res) => {
  const shortCart = req.body.data.cart.map((item) => {
    return {
      quantity: item.quantity,

      product_price: item.product_price,
      product_name: item.product_name,
    };
  });

  const customer = await stripe.customers.create({
    metadata: {
      user_id: req.body.data.user.user_id,
      cart: JSON.stringify(shortCart),
      total: req.body.data.total,
    },
  });

  const line_items = req.body.data.cart.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product_name,
          images: [item.imageURL],
          metadata: {
            id: item.productId,
          },
        },
        unit_amount: item.product_price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    customer: customer.id,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/`,
  });

  res.send({ url: session.url });
});

let endpointSecret;
// endpointSecret = process.env.WEBHOOK_SECRET;

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    let eventType;
    let data;

    if (endpointSecret) {
      let event;
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the event
    if (eventType === "checkout.session.completed") {
      stripe.customers.retrieve(data.customer).then((customer) => {
        // console.log("Customer details", customer);
        // console.log("Data", data);
        // createOrder(customer, data, res);
      });
    }

    // Return a 200 res to acknowledge receipt of the event
    res.send().end();
  }
);

module.exports = router;
