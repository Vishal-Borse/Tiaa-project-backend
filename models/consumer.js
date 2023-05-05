import mongoose from "mongoose";

const consumerSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rashionid: { type: String, required: true },
  aadhar: { type: String, required: true },
  members: { type: Number, default: 0 },
  state: { type: String, required: true },
  district: { type: String, required: true },
  city: { type: String, required: true },
  age: { type: Number, default: 0 },
  zipcode: { type: Number, required: true },
  password: { type: String, required: true },
});

export default mongoose.model("Consumer", consumerSchema);
