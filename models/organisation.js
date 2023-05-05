import mongoose from "mongoose";

const organisationSchema = mongoose.Schema({
  name: { type: String, required: true },
  liscenseId: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// userSchema.index({ name: "text" });

export default mongoose.model("Organisation", organisationSchema);
