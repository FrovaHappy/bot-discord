import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
  {
    guild: { type: String, required: true },
    description: { type: String },
    role: { type: String },
  },
  { timestamps: true }
);

export const countdownModel = mongoose.model("Countdown", schema);
