import { Router } from "express";
const routerSocket = Router();

routerSocket.get("/", (req, res) => {
//  res.render("login", {});
  res.redirect("/");

  //  res.render("index", {});
});

export default routerSocket;
