const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Route
app.use("/api/v1/payment-service", proxy(process.env.PAYMENT_SERVICE));
app.use("/api/v1/order-service", proxy(process.env.ORDER_SERVICE));
app.use("/api/v1/shopping-service", proxy(process.env.SHOPPING_SERVICE));
app.use("/api/v1/user-service", proxy(process.env.USER_SERVICE));

app.listen(8000, () => {
  console.log("Gateway is running on port 8000");
});
