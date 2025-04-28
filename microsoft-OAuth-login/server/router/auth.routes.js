import express from 'express'
import { getUser, Login } from '../controller/auth.controller.js'


const router = express()

router.post('/login', Login)
router.get('/get-user', getUser)

export const authRouter = router