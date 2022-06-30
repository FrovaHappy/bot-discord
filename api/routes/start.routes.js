import {Router} from 'express'
const router = Router()

router.get('/', async (_req, res) => {
  try {
    await import('../deploy-commands.js')
    res.status(201).json({message:'Desplegado con exíto.'})
  } catch (e) {
    res.status(501).json({message:'error al desplegar los slash command.'})
  }
})

export default router