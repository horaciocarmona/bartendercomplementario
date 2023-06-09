import {Router} from'express'
import routerProd from "./products.router.js";
import routerCart from "./carts.router.js";
import routerSession from "./session.router.js";
import routerUser from "./user.router.js";
import routerGithub from "./github.router.js";
import routerSocket from './socket.router.js';
import routerMockingProducts from './mockingproducts.router.js';

const router=Router()

//router.use("/", express.static(__dirname + "/public"));
router.use("/", routerSocket);
router.use("/api/products", routerProd);
router.use("/api/carts", routerCart);
router.use("/api/session",routerSession)
router.use("/api/users",routerUser)
router.use("/session",routerGithub)
router.use("/api/mockingProducts",routerMockingProducts)
// router.use("/*",(req,res)=>{
//      res.status(404).send({error:"404 ruta equivocada"})
//  })
export default router