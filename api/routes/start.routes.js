import { Router } from 'express'
import { deployCommands } from '../deploy-commands.js'
const router = Router()

router.get('/', async (_req, res) => {
  try {
    const deploy = await deployCommands()
    res.status(201).json({ message: 'Desplegado con exíto.', deploy })
  } catch (e) {
    console.error(e)
    res.status(501).json({ message: 'error al desplegar los slash command.' })
  }
})

export default router
