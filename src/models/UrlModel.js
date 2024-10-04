import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: [true, "Original url is required!"],
    },
    shortCode: {
      type: String,
      required: [true, "Short code is required!"],
    },
    customCode: {
      type: String,
      requuired: true,
    },
  },
  { timestamps: true }
);

const Url = mongoose.model("Url", urlSchema);
export default Url;
