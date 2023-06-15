import "dotenv/config";
import { addLogger } from './utils/logger.js'

import { faker } from '@faker-js/faker';
import compression from "express-compression"
import nodemailer from 'nodemailer'
import cookieParser from "cookie-parser";
import connectionMongoose from "./db/mongoose.js";
import sequelize from "./db/sequelize.js";
import fileStore from "session-file-store";
import routerSession from "../src/routes/session.router.js";
import MongoStore from "connect-mongo";
import passport from "passport";
import express, { urlencoded } from "express";
import session from "express-session";
import { __dirname } from "./path.js";
import multer from "multer";
import { engine } from "express-handlebars"; //server simple
import * as path from "path";
import { Server } from "socket.io";
import { Router } from "express";
// import routerProd from "../src/routes/products.router.js";
// import routerCart from "../src/routes/carts.router.js";
// import routerUser from "../src/routes/user.router.js";
import router from "../src/routes/routes.js";
import errorHandler from "./helpers/middlewares/errors/index.js"
import routerSocket from "../src/routes/socket.router.js";
//import {ManagerMessageMongoDB} from '../src/dao/MongoDB/models/Message.js'
// no se hace porque debo consultar a dao
import { getManagerMessages } from "../src/dao/daoManager.js";
import initializePassport from './config/passport.js'
// import initializePassport from "./config/passport.js";
import { passportError, authorization } from "./utils/messageErrors.js";
import cors from 'cors'
const whiteList=['http://localhost:3000'] //rutas validas a mi servidor
const corsOptions={
    origin:(origin,callback)=>{
        if(whiteList.indexOf(origin) !==1) {
          callback(null,true)
        } else {
          callback(new Error('Not allowed with cors'))
        }
    }

}

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
const fileStorage = fileStore(session);

//conexion mongoose
// const connectionMongoose = async () => {
//   await mongoose.connect(process.env.MONGODBURL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//   })
//       .catch((err) => console.log(err));
// }

//await connectionMongoose().then(connect=>console.log('mongoose conectado'));
console.log("seleccion",process.env.SELECTEDBDD)
switch (parseInt(process.env.SELECTEDBDD)) {
  case 1:
    await connectionMongoose().then(connect=>console.log('mongoose conectado'))
  case 2:
//      await sequelize.sync().then(connect=>console.log('sequelize conectado'))
 
}
  
/// uso de logger
// app.get("/", (req, res) => {
//     req.logger.warning("Alerta!")
//     res.send("Hola")
// })
  

//Midlewares
app.use(addLogger) //uso de logger
app.use(compression({brotli:{enabled:true,zlib:{}}})) //para comprimir archivos 
app.use(cors(corsOptions))
app.use(cookieParser(process.env.PRIVATE_KEY_JWT));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  session({
    //   lugar de guardado time to live intentos de lectura
    //  store : new fileStorage({path:'./sessions',ttl:30000,retries:1}),
    //  store: MongoStore.create({
    //      mongoUrl:process.env.MONGODBURL,
    //      mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
    //      ttl:30,
    //  }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);


//passport se define antes de las rutas para usarlo como midlewords
initializePassport();
app.use(passport.initialize());
//app.use(passport.session())


function requireLogin(req, res, next) {
  console.log("requirelogin", req.session.user);
  if (!req.session.user) {
    console.log("redirectlogin", req.session.user);
    return res.redirect("/api/users/login");
  }
  next();
}

function requireLoginJWT(req, res, next) {
  console.log("requireloginJWT");
  if (req.user) {
    return res.redirect("/api/session/product");
  } else {
    console.log("redirectloginJWT");
    return res.redirect("/api/users/loginJWT");
  }
  next();
}

function auth(req, res, next) {
  if (req.session?.email === "admin@admin.com") {
    return next();
  }
  return res.send("no tenes acceso a esta ruta");
}

app.engine("handlebars", engine()); //configuracion de hbs
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));
app.set("port", process.env.PORT || 5000);

//Routers
app.use("/", express.static(__dirname + "/public"));
app.use("/", routerSocket);
app.use("/", router);
app.use(errorHandler)
//app.use("/auth", routerSession);

//  app.use("/api/products", routerProd);
//  app.use("/api/carts", routerCart);
//  app.use("/api/session",routerSession)
//  app.use("/api/users",routerUser)

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
//        {title:"Whisky Jack Daniels 750ml",descripon:"",price:12000,thumpbnail:"",code:7,stock:178,status:true,category:"grande"},
//        {title:"Puerto de Indias clasico 700ml",description:"",price:6300,thumpbnail:"",code:7,stock:165,status:true,category:"grande"}
//    ])
//  }
//  start()



// use de mail con nodemail
const transport=nodemailer.createTransport({
    service:'gmail',
    port: 587,
    auth:{
      user:'horacio.carmona@gmail.com',
      pass:process.env.PASSWORDGMAIL
    }
})
app.get('/mail',async (req,res)=>{
  const resultado=await transport.sendMail({
    from:'horacio.carmona@gmail.com',
    to:'carmona_horacio@hotmail.com',
    subject:'suscripcion a ecommerce',
    html:` <div>
                <h1>hola se suscribio a ecommerce</h1>
           </div>
    `,
    attachments:[]

  })    
  res.send('mail enviado')
})


// Uso de Servidor io
const server = app.listen(app.get("port"), () =>
  console.log(`
server on port ${app.get("port")}`)
);

// mockup de datos de usuarios
const users = []

const createRandomUser = () => {
    return {
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        img: faker.image.food(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
    };
}

// for (let i = 0; i < 100; i++) {
//     users.push(createRandomUser());
// }

// console.log(users)

//Carga de Imagenes
app.post("/upload", upload.single("product"), (req, res) => {
  console.log(req.file);
  res.send("Imagen cargada");
});

// const source = document.getElementById('formulario-template').innerHTML;
// const template = Handlebars.compile(source);
// const html = template(context);
// document.getElementById('formulario-container').innerHTML = html;

//Endpoint cookies
app.get("/setCookie", (req, res) => {
  res
    .cookie("CookieCookie", "esto es una cookie", {
      maxAge: 20000,
      signed: true,
    })
    .send("Cookie");
});

app.get("/getCookie", (req, res) => {
  res.send(req.signedCookies);
});

// app.get("/session", (req, res) => {
//     const deviceWidth="50%"
//     res.render('login',{deviceWidth})
// });

//Endpoint session
// app.get("/session", (req, res) => {
//   if (req.session.counter) {
//     req.session.counter++;
//     res.send(`has entrado ${req.session.counter} de veces`);
//   } else {
//     req.session.counter = 1;
//     res.send("hola");
//   }
// });

//  app.get("/login", (req, res) => {
//    const { email, password } = req.body;
//    if (email == "adminCoder@coder.com" && password == "adminCod3r123") {
//      req.session.email = email;
//      req.session.password = password;
//      req.session.rol = 'admin';
//      return res.send("login");
//    } else {
//       if((email) && (password)) {
//         req.session.email = email;
//         req.session.password = password;
//         req.session.rol = 'user';
//         return res.send("login");

//       } else {
//         return res.send("login fallido");
//       }
//    }
//  });

//  app.get("/logout", (req, res) => {
//    req.session.destroy((error) => {
//      res.send("salio");
//    });
//  });

//  app.get("/admin", auth, (req, res) => {
//   req.session.rol = 'admin';
//   res.send("sos el admin");
//  });

app.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts", {
    listProducts,
  });
});

//login del ususario
// app.get('/ingreso', requireLogin, (req, res) => {
//    res.render('product', { user: req.session.user });
// });
app.get("/api", requireLoginJWT, (req, res) => {
  res.redirect("/api/session/product", 200, {
    message: "Bienvenido/a a mi tienda",
  });
  // res.render('product',{
  // message: "Bienvenido/a a mi tienda",
  // user:req.session.user
  // });
});

app.get("/api/users/login", (req, res) => {
  console.log("entra al login");
  const contextRegister = { actionURLRegister: "/api/users/register" };
  const context = { actionURL: "/api/session/login" };
  res.render("login", { user: req.session.user });
});

app.get("/api/users/loginJWT", (req, res) => {
  console.log("entra al loginJWT");
  const context = { actionURL: "/api/session/loginJWT" };
  const contextRegister = { actionURLRegister: "/api/users/registerJWT" };
  //    res.render('login', { user: req.user });
  res.render("login", { user: req.user });
});

app.get("/api/users/loginregister", (req, res) => {
  const deviceWidth = "50%";
  const context = { actionURL: "/api/users/register" };
  res.render("register", { deviceWidth, context });
});

app.get("/api/users/loginregisterJWT", (req, res) => {
  console.log("entra al loginregisterJWT");
  const deviceWidth = "50%";
  const context = { actionURL: "/api/users/registerJWT" };
  res.render("register", { deviceWidth, context });
});

app.get("/api/session/product", (req, res) => {
  const deviceWidth = "50%";
  const user = req.session.user;
  res.render("product", { deviceWidth, user });
});

//middleware para bajar informacion comprimida
app.get('/string',(req,res)=>{
  let string="hola buenas noches argentina desde la quiaca"
  for (let i=0 ;i < 1000;i++){
    string+="hola buenas noches argentina desde la quiaca"
  }
  res.send(string)
})


const io = new Server(server);
// routerSocket.get("/login", (req, res) => {
//   const deviceWidth="50%"
//   res.render("login", {deviceWidth});

//   // res.render('home',{
//   //     tituloAlta:"Alta de Producto",
//   //     tituloEliminacion:"Eliminar Producto",
//   //     mensaje:"mundo"
//   // })
// });

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
