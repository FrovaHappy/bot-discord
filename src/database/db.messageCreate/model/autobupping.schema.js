import mongoose, { Schema } from 'mongoose'

const authorsSchema = new Schema({
  authorId: { type: String, required: true },
  commandName: { type: String, required: true },
  relativeTimestamp: { type: Number, required: true },
})

const autobuppingSchema = new Schema({
  authors: [authorsSchema],
  guildId: { type: String, required: true },
  roleId: { type: String },
})

export const autobuppingModel = mongoose.model('autobupping', autobuppingSchema)
