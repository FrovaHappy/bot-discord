import express from 'express'
import cors from 'cors'
import config from '../config.js'
import searchCommands from './util/searchCommands.js'
import router from './router.js'

const app = express()

// middlewares
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// routers
/*
  Este tiene que ser un post que recibe un req.commandsPremiun [] y un req.commands []
*/
app.use('/deploy', router)
app.get('/deploy/searchCommands', async (_req, res) => {
  try {
    const commands = await searchCommands()
    res.status(201).json({comands: commands})
  }catch(e) {
    res.status(501).json({message: 'Error searching'})
  }
})
// listen

app.listen(config.PORT, () => {
  console.log(`server on port ${config.PORT}`)
})