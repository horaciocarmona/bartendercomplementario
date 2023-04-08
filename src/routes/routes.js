import {Router} from'express'
import routerProd from "./products.router.js";
import routerCart from "./carts.router.js";
import routerSession from "./session.router.js";
import routerUser from "./user.router.js";
//import routerSocket from './socket.router';
const router=Router()

//router.use("/", express.static(__dirname + "/public"));
//router.use("/", routerSocket);
router.use("/api/products", routerProd);
router.use("/api/carts", routerCart);
router.use("/api/session",routerSession)
router.use("/api/users",routerUser)

export default router