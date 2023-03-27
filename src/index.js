import cookieParser from "cookie-parser";
import "dotenv/config";
import express, { urlencoded } from "express";
import { __dirname } from "./path.js";
import multer from "multer";
import { engine } from "express-handlebars"; //server simple
import * as path from "path";
import { Server } from "socket.io";
import { Router } from "express";
import routerProd from '../src/routes/products.router.js'
import routerCart from '../src/routes/carts.router.js'
import routerSocket from '../src/routes/socket.router.js'
//import {ManagerMessageMongoDB} from '../src/dao/MongoDB/models/Message.js'
// no se hace porque debo consultar a dao
import { getManagerMessages } from "../src/dao/daoManager.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/img");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
const managerMessage = getManagerMessages();
const app = express();

//Midlewares
app.use(cookieParser(process.env.SIGNED_COOKIE));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.engine("handlebars", engine()); //configuracion de hbs
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));
app.set("port", process.env.PORT || 5000);

//Routers
app.use("/", express.static(__dirname + "/public"));
app.use("/", routerSocket);
app.use('/api/products',routerProd)
app.use('/api/carts',routerCart)

// //Carga de Productos
//  const start = async ()=>{
//    await mongoose.connect("mongodb+srv://horaciocarmona:h21163ho@cluster0.z8ctovc.mongodb.net/ecommerce?retryWrites=true&w=majority");
//    const productSchema = new mongoose.Schema({
//      title:{type:String,require:true,max:50,index:true},
//      description:{type:String,require:true,max:50,index:true},
//      price:{type:Number,require:true},
//      thumpbnail:{type:String,require:true,max:50},
//      code:{type:Number,require:true},
//      stock:{type:Number,require:true},
//      status:{type:Boolean,require:true},
//      category:{type:String,
//          index:true,
//          require:true,
//          enum:['grande','mediano','chico'],
//          default:'mediano'}
//  })
//    const ModelProduct = mongoose.model('products',productSchema);

//   await ModelProduct.insertMany([
//        {title:"Ron Avana Club clasico 700ml",description:"",price:6300,thumpbnail:"",code:1,stock:165,status:true,category:"grande"},
//        {title:"Campari 750ml",description:"",price:1800,thumpbnail:"",code:2,stock:32,status:true,category:"grande"},
//        {title:"Gin Bombay Bramble 700",description:"",price:3800,thumpbnail:"",code:3,stock:150,status:true,category:"mediano"},
//        {title:"Capel reservado clasico 700ml",description:"",price:4200,thumpbnail:"",code:4,stock:300,status:true,category:"mediano"},
//        {title:"Negroni 750ml",description:"",price:5000,thumpbnail:"",code:5,stock:190,status:true,category:"grande"},
//        {title:"Heraclito clasico 700ml",description:"",price: 4500,thumpbnail:"",code:6,stock:180,status:true,category:"mediano"},
//        {title:"Whisky Jack Daniels 750ml",description:"",price:12000,thumpbnail:"",code:7,stock:178,status:true,category:"grande"},
//        {title:"Puerto de Indias clasico 700ml",description:"",price:6300,thumpbnail:"",code:7,stock:165,status:true,category:"grande"}
//    ])
//  }
//  start()



// Uso de Servidor io
const server = app.listen(app.get("port"), () =>
  console.log(`
server on port ${app.get("port")}`)
);

//Carga de Imagenes
app.post("/upload", upload.single("product"), (req, res) => {
  console.log(req.file);
  res.send("Imagen cargada");
});

app.get('/setCookie',(req,res)=>{
    res.cookie('CookieCookie','esto es una cookie',{maxAge:20000,signed:true}).send('Cookie')
})

app.get('/getCookie',(req,res)=>{
  res.send(req.cookies)
})

app.get('/realTimeProducts',(req,res)=>{
  res.render('realTimeProducts',{
      listProducts
  })
})

const io = new Server(server);


routerSocket.get("/", (req, res) => {

  //  const deviceWidth="50%"
//    res.render("chat", {deviceWidth});
    // res.render('home',{
    //     tituloAlta:"Alta de Producto",
    //     tituloEliminacion:"Eliminar Producto",
    //     mensaje:"mundo"

    // })
});



io.on("connection", (socket) => {
    socket.on("message", (info) => {
    console.log("se va a conectar");
    // managerMessage.addElements([info]).then(() => {
    //      managerMessage.getElements().then((mensajes) => {
    //       console.log(mensajes);
    //       socket.emit("allMessages", mensajes);
    //     });
    //   });
    });
});
