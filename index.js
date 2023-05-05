import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import consumerRoutes from "./routes/consumers.js";
import organiserRoutes from "./routes/organisers.js";

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/consumer", consumerRoutes);
app.use("/organiser", organiserRoutes);

app.get("/", (req, res) => {
  res.send("This is a stack overflow clone API");
});

const PORT = process.env.PORT || 5000;

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
