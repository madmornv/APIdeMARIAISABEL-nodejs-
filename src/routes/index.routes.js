import {Router} from 'express'
import {ping} from '../controllers/index.controlllers.js'

const router = Router()

router.get('/ping',ping );

export default router