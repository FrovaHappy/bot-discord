import mongoose from 'mongoose'
import config from '../config.js'

;(async () => {
  try {
    const db = await mongoose.connect(config.MONGODB_HOST)
    console.log('Mongodb is connected to', db.connection.host)
  } catch (error) {
    console.error(error)
  }
})()
