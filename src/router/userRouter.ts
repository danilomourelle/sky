import express from "express";
import { PhoneController } from "../controller/PhoneController";
import { TokenController } from "../controller/TokenController";
import { UserController } from "../controller/UserController";
import moment from "moment";

moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss'
moment.utc(-180)

export const userRouter = express.Router()

const user = new UserController()
const phone = new PhoneController()
const token = new TokenController()

userRouter.post('/sign-up', user.signUp, phone.signUp, token.signUp)

userRouter.post('/sign-in', user.signIn, phone.signIn, token.signIn)

userRouter.get('/:userId', token.check, phone.check, user.check)
