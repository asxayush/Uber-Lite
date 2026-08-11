import express, { Router } from 'express'
import userRegisterValidator from '../validators/auth.validators.js'
import { registerUser } from '../controllers/user.controllers.js'


const router = express.Router()

router.post('/register', [
    userRegisterValidator(),
    
    registerUser
])

export default router