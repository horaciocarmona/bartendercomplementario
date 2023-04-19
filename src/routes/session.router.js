import {Router} from "express"
import passport from "passport"
import { getSession,destroySession,testLogin,product} from "../controllers/session.controller.js"
const routerSession=Router()
routerSession.get('/', getSession)
routerSession.post('/login', passport.authenticate('login'), testLogin)
routerSession.get('/logout', destroySession)
routerSession.get('/product', product)
export default routerSession