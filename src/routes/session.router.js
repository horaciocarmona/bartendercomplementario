import {Router} from "express"
import { getSession,destroySession,testLogin,product} from "../controllers/session.controller.js"
const routerSession=Router()
routerSession.get('/', getSession)
routerSession.get('/login', getSession)
routerSession.post('/testlogin', testLogin)
routerSession.get('/logout', destroySession)
routerSession.get('/product', product)
export default routerSession