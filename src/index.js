import "dotenv/config";
import express, { urlencoded } from "express";
import { __dirname } from "./path.js";
import multer from "multer";
import { engine } from "express-handlebars"; //server simple
import * as path from "path";
import { Server } from "socket.io";
import { Router } from "express";
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
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.engine("handlebars", engine()); //configuracion de hbs
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));
app.set("port", process.env.PORT || 5000);

const server = app.listen(app.get("port"), () =>
  console.log(`
server on port ${app.get("port")}`)
);

const io = new Server(server);

const routerSocket = Router();
routerSocket.get("/", (req, res) => {
  const deviceWidth="50%"
  res.render("chat", {deviceWidth});
});

//Routers
app.use("/", express.static(__dirname + "/public"));
app.use("/", routerSocket);

app.post("/upload", upload.single("product"), (req, res) => {
  console.log(req.file);
  res.send("Imagen cargada");
});

io.on("connection", (socket) => {
  socket.on("message", (info) => {
    console.log("se va a conectar");
    managerMessage.addElements([info]).then(() => {
      managerMessage.getElements().then((mensajes) => {
        console.log(mensajes);
        socket.emit("allMessages", mensajes);
      });
    });
  });
});
