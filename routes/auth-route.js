const { Router } = require('express')
const { register, login, getAllUser} = require('../service/auth-service.js')

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/users', getAllUser)


module.exports = authRouter