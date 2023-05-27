import { Router } from "express";
import { passportError, authorization } from "../utils/messageErrors.js";

const routerSocket = Router();

routerSocket.get("/",passportError('current'),authorization('User'), (req, res) => {
//  res.render("login", {});
  return res.redirect("/");

  //  res.render("index", {});
});

export default routerSocket;
