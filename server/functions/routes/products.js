const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const express = require("express");
const isAuth = require("../middleware/isAuth");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);
const { body } = require("express-validator");
const { validationResult } = require("express-validator");

// const endpointSecret = process.env.WEBHOOK_SECRET;

// PRODUCT===================================================================================
// create product
router.post(
  "/create",
  isAuth,
  [
    body("product_name", "Invalid product name").exists({ checkFalsy: true }),
    body("product_price", "Invalid product price").isFloat({ min: 0 }),
    body("product_description", "Invalid product descrition").exists({
      checkFalsy: true,
    }),
    body("imageURL", "Invalid imageURL").isURL(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();

      next(error);
    } else {
      const id = Date.now();
      const data = {
        product_id: id,
        product_name: req.body.product_name,
        product_Category: req.body.product_Category,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        imageURL: req.body.imageURL,
        rating: [5],
      };
      try {
        const response = db.collection("products").doc(`/${id}/`).set(data);
        return res.status(200).send({ succes: true, data: response });
      } catch (error) {
        next(error);
      }
    }
  }
);
//update product
router.post(
  "/update",
  isAuth,
  [
    body("product_name", "Invalid product name").exists({ checkFalsy: true }),

    body("product_price", "Invalid product price").isFloat({ min: 0 }),
    body("product_description", "Invalid product descrition").exists({
      checkFalsy: true,
    }),
    body("imageURL", "Invalid imageURL").isURL(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();

      next(error);
    } else {
      const id = req.body.product_id;
      const updateData = {
        product_name: req.body.product_name,
        product_Category: req.body.product_Category,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        imageURL: req.body.imageURL,
      };
      try {
        const response = db
          .collection("products")
          .doc(`/${id}/`)
          .update(updateData);
        return res.status(200).send({ succes: true, data: response });
      } catch (error) {
        next(error);
      }
    }
  }
);

// get all products
router.get("/all", async (req, res, next) => {
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
    next(err);
  }
});

//delete product

router.delete("/delete/:productId", isAuth, async (req, res, next) => {
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
    next(err);
  }
});

//get product by ID
router.get("/detail/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const response = await db
      .collection("products")
      .doc(`/${productId}/`)
      .get();

    return res.status(200).send({ success: true, data: response.data() });
  } catch (error) {
    next(err);
  }
});

// PRODUCT===================================================================================

//CART========================================================================================
// add product to cart
router.post("/addToCart/:userId", isAuth, async (req, res) => {
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
    next(err);
  }
});

//update cart items
router.post("/updateCart/:user_id", isAuth, async (req, res) => {
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
  } catch (error) {
    next(err);
  }
});

// get item in user cart

router.get("/getCartItems/:userId", async (req, res, next) => {
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
      next(err);
    }
  })();
});

// create checkout session
router.post("/create-checkout-session", async (req, res, next) => {
  //filter cart remove URL image
  const shortCart = req.body.data.cart.map((item) => {
    return {
      quantity: item.quantity,
      productId: item.productId,
      product_price: item.product_price,
      product_name: item.product_name,
    };
  });
  // custom customer
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
    payment_method_types: ["card"],
    shipping_address_collection: { allowed_countries: ["VN"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "usd" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "hour", value: 2 },
            maximum: { unit: "hour", value: 4 },
          },
        },
      },
    ],
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
// listen event send from stripe
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

        ///call helper function create Order
        createOrder(customer, data, res);
      });
    }

    // Return a 200 res to acknowledge receipt of the event
    res.send().end();
  }
);

//helper function crete order
const createOrder = async (customer, intent, res, next) => {
  console.log("Inside the orders");
  try {
    const orderId = Date.now();
    const data = {
      intentId: intent.id,
      orderId: orderId,
      amount: intent.amount_total,
      created: intent.created,
      payment_method_types: intent.payment_method_types,
      status: intent.payment_status,
      customer: intent.customer_details,
      shipping_details: intent.shipping_details,
      userId: customer.metadata.user_id,
      items: JSON.parse(customer.metadata.cart),
      total: customer.metadata.total,
      sts: "preparing",
    };

    const dataInvoice = {
      email: customer.email,
      items: JSON.parse(customer.metadata.cart),
      invoice_prefix: customer.invoice_prefix,
      total: customer.metadata.total,
      shipping_details: intent.shipping_details,
      orderId: orderId,
    };
    //create order
    await db.collection("orders").doc(`/${orderId}/`).set(data);
    //send Invoice-confirm email
    await sendInvl(dataInvoice);
    //remove cart
    deleteCart(customer.metadata.user_id, JSON.parse(customer.metadata.cart));
    console.log("*****************************************");

    return res.status(200).send({ success: true });
  } catch (err) {
    next(err);
  }
};
//helper function send invoice

const sendInvl = async (data) => {
  console.log("inside sent mail");
  const msg = {
    to: data.email, // Change to your recipient
    from: "huydqfx17618@funix.edu.vn", // Change to your verified sender
    subject: "Invoice - Confirm Order",
    text: "Invoice - Confirm Order",
    html: `
        <body>
          <div style="padding: 10px;">
            <table style="width: 100%;">
              <tr style="width: 100%;">
                <td style="width: 50%;">
                  <label style="font-size: 40px; font-weight: bold;">INV-${
                    data.invoice_prefix
                  }</label>
                </td>
                <td style="width: 50%; text-align: right;">
                 <p>ORDER: ${data.orderId}</p>
                </td>
              </tr>
            </table>
            <table style="width: 100%; margin: 10px 0px;">
              <tr style="width: 100%;">
                <td style="width: 33%; line-height: 25px;">
                  <label>From</label><br />
                  <label style="font-weight: bold; font-size: 20px;"
                    >HFood</label
                  >
                  <br />
                  Ha Noi <br />
                  Ha Noi <br />
                </td>
                <td style="width: 33%; line-height: 25px;">
                  <label>To</label><br />
                  <label style="font-weight: bold; font-size: 20px;"
                    >${data.shipping_details.name}</label
                  ><br />
                  ${data.shipping_details.address.line1} <br />
                  ${data.shipping_details.address.line2} <br />
                </td>
                <td style="width: 33%; margin: auto;">
                  <span
                    style="
                      background: #e1e1e1;
                      font-size: 30px;
                      font-weight: bold;
                      padding: 10px;
                      color: #343a40;
                    "
                  >
                    PAID</span
                  >
                </td>
              </tr>
            </table>
            <table style="width: 100%;">
              <tr style="background: #343a40; color: white;">
                <th style="padding: 10px;">
                  Product name
                </th>
                <th>
                  Amount
                </th>
                <th>
                Sub Total
                </th>
              </tr>
             ${data.items.map((item) => {
               return `
               <tr>
               <td>
                 ${item.product_name}
               </td>
               <td>
                 ${item.quantity}
               </td>
               <td>
                 ${parseInt(item.product_price) * parseInt(item.quantity)}
               </td>
             </tr>
               
               `;
             })}
            </table>
            <table style="width: 100%; margin-top: 25px;">
        <tr style="background: #060606; color: white; font-size:20px">
          <th style="padding: 15px;">
            Total
          </th>
          <th style="padding: 15px;">
            ${data.total}
          </th>
        </tr>
      </table>
        </div>

            
          </div>
        </body>
      
      `,
  };

  sgMail
    .send(msg)
    .then((response) => {
      // console.log(response[0].statusCode);
      // console.log(response[0].headers);
      console.log("sent email...");
    })
    .catch((error) => {
      console.error(error);
    });
};

// helper function delete
const deleteCart = async (userId, items) => {
  console.log("Inside the delete");

  // console.log(userId);

  console.log("*****************************************");
  items.map(async (data) => {
    // console.log("-------------------inside--------", userId, data.productId);
    await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${data.productId}/`)
      .delete()
      .then(() => console.log("-------------------successs--------"));
  });
};

//CART========================================================================================

//ORDER========================================================================================

router.get("/orders", async (req, res) => {
  try {
    let query = db.collection("orders");
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

// update the order status
router.post("/updateOrder/:order_id", isAuth, async (req, res) => {
  const order_id = req.params.order_id;
  const sts = req.query.sts;

  try {
    const updatedItem = await db
      .collection("orders")
      .doc(`/${order_id}/`)
      .update({ sts });
    return res.status(200).send({ success: true, data: updatedItem });
  } catch (er) {
    return res.send({ success: false, msg: `Error :,${er}` });
  }
});

//ORDER========================================================================================

module.exports = router;
