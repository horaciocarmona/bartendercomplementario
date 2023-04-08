import { Router } from "express";
import { createUser, getUserById,register } from "../controllers/user.controller.js";
import passport from "passport";
const routerUser = Router()
//routerUser.post("/register", passport.authenticate('register'), createUser)
routerUser.post("/",createUser)
routerUser.post("/",register)
routerUser.get("/:id",getUserById)

export default routerUser