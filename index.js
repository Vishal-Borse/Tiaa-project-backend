import express from "express";

import cors from "cors";
import mongoose from "mongoose";
import Morgan from 'morgan';
import dotenv from "dotenv";
dotenv.config();
// const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8081;
const app = express();
app.use(Morgan("combined"));
// app.use(cookieParser());
mongoose.set("strictQuery", true);
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());

import consumerRoutes from "./routes/consumers.js";
import organiserRoutes from "./routes/organisers.js";

app.use("/consumer", consumerRoutes);
app.use("/organiser", organiserRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const DATABASE_URL =
  "mongodb+srv://admin:admin@ration-distribution-clu.tmm7mkf.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
