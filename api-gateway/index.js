const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Route
app.use("/api/v1/payment-service", proxy("http://localhost:3003"));
app.use("/api/v1/order-service", proxy("http://localhost:3002"));
app.use("/api/v1/shopping-service", proxy("http://localhost:3001"));
app.use("/api/v1/user-service", proxy("http://localhost:3000"));

app.listen(8000, () => {
  console.log("Gateway is running on port 8000");
});
