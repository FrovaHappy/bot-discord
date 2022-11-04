import mongoose from 'mongoose'
const { Schema } = mongoose

const schema = new Schema(
  {
    guild: { type: String, required: true },
    description: { type: String },
    role: { type: String },
    channel: { type: String },
    hours: { type: Number },
    mins: { type: Number },
  },
  { timestamps: true }
)

export const countdownModel = mongoose.model('Countdown', schema)
