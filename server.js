const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db"); //mongoose connection


dotenv.config();


const testRoute = require("./routes/testroute");
const authRoute = require("./routes/authRoutes"); //for register or login user
const userRoute = require("./routes/userRoutes");
const restaurentRoutes = require("./routes/restaurentRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const foodRoutes = require("./routes/foodRoutes");
const orderRoutes  = require ("./routes/orderRoutes")

connectDb();


const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan("dev")); 


app.use("/api/v1/test", testRoute); 
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurent", restaurentRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/food", foodRoutes);
app.use("/api/v1/order",orderRoutes);


app.get("/", (req, res) => {
  return res.status(200).send(`<h1> welcome to server </h1>`);
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`.white.bgMagenta);
});
