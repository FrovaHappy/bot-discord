import express from 'express'
// routes
import start from './routes/start.routes.js'

const app = express()

app.use('/start', start)

export default app
