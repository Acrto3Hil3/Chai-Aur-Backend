import Razorpay from "razorpay";
import path from "path";
import fs from "fs";
import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

const razorpay = new Razorpay({
  key_id: "rzp_test_Y2wy8t1wD1AFaA", // razor pay id
  key_secret: "zSqRMpIa2ljBBpkieFYGmfLa", // razorpay secret key
});

const readData = () => {
  if (fs.existsSync("orders.json")) {
    const data = fs.readFileSync("orders.json");
    return JSON.parse(data);
  }
  return [];
};

const writeData = (data) => {
  fs.writeFileSync("orders.json", JSON.stringify(data, null, 2));
};

if (!fs.existsSync("orders.json")) {
  writeData([]);
}

app.post("/create-order", async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;

    const options = {
      amount: amount * 100, // it convert the paisa into rupees so amount * 100
      currency,
      receipt,
      notes,
    };

    const order = await razorpay.orders.create(options);

    // read current orders, add new order, and write back to the file
    const orders = readData();
    orders.push({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: "created",
    });
    writeData(orders);

    // send order details to frontend, including order id
    res.status(200).json({
      success: true,
      order: order,
      message: "order created successfully..",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "order creation fails", error: error, success: false });
  }
});

app.get("/payment-success", (req, res) => {
  res.sendFile(path.join(__dirname, "success.html"));
});

app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const secret = razorpay.key_secret;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  try {
    const isValidSignature = validateWebhookSignature(
      body,
      razorpay_signature,
      secret
    );

    if (isValidSignature) {
      const orders = readData();
      const order = orders.find((ordr) => ordr.order_id === razorpay_order_id);
      if (order) {
        order.status = "paid";
        order.payment_id = razorpay_payment_id;
        writeData(orders);
      }
      console.log("Before res Payment verification successfully..");
      res.status(200).json({ status: "ok", success: true });
      console.log("After res Payment verification successfully..");
    } else {
      res.status(400).json({ status: "verification_failed" });
      console.log("Payment verification failed");
    }
  } catch (error) {
    console.log("Errror to verify payment", error);
    res
      .status(500)
      .json({ status: "error", message: "Error verifying payment" });
  }
});

app.listen(port, () => {
  console.log(`Server connected to http://localhost:${port}`);
});
