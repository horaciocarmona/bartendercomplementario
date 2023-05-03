import { Router } from "express";
import { createUser, getUserById } from "../controllers/user.controller.js";
import passport from "passport";

const routerUser = Router()
// routerUser.post("/", createUser)
routerUser.post("/register",passport.authenticate('register'),createUser)
routerUser.get("/id",getUserById)
routerUser.get("/registerJWT",passport.authenticate('jwt',{session:false},createUser))

export default routerUser