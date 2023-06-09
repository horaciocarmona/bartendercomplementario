import {Router} from "express"
import passport from "passport"

//import { generateToken } from "../utils/jwt.js";
//import { validatePassword } from '../utils/bcrypt.js'
import { getSession,destroySession,testLogin,testLoginJWT,product,registerUser, loginUser} from "../controllers/session.controller.js"
import { passportError, authorization } from "../utils/messageErrors.js";
const routerSession=Router()
//routerSession.get('/', getSession)
//routerSession.post('/login', passport.authenticate('login'), testLogin)
// routerSession.post('/login', testLoginJWT)
//routerSession.post('/loginJWT', passport.authenticate('jwt'),testLoginJWT)
//routerSession.post("/register",passport.authenticate('register'),registerUser)
routerSession.post("/register",registerUser)
routerSession.post('/login',loginUser)
routerSession.get('/logout', destroySession)
routerSession.get('/product',passport.authenticate('current',{session:false}), product)

// consulta las cookies de mi navegador
routerSession.get('/testJWT',passport.authenticate('current',{session:false},(req,res)=>{
    res.send(req)
}))
routerSession.get('/current',passportError('current'),authorization('User'),(req,res)=>{
    res.send(req.user.user)   
})

// routerSession.post('/login', async (req, res, next) => {
// //    const { email,password } = req.body
//     passport.authenticate('login', { session: false }, async (err, user, info) => {
//       if (err) {
//         return next(err);
//       }
//       if (!user) {
//         return res.status(401).json({ message: info.message });
//       }
//       try {
//         const accessToken=generateToken(user)
//         console.log(accessToken)
//         res.cookie('jwtCookie', accessToken, { httpOnly: true });
//         res.json({ message: 'Inicio de sesión exitoso' });
//       } catch (err) {
//         next(err);
//       }
//     })(req, res, next);
//   })
    

export default routerSession