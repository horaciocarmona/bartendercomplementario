import  {getUserByEmail}  from "./user.controller.js";
import { generateToken } from "../utils/jwt.js";
import passport from "passport"

export const getSession = (req, res, next) => {
//  if (req.session.login) {
    if (req.user) {
    //Si la sesion esta activa en la BDD
          res.redirect("/api/session/product", 200, {
//            res.redirect("/api", 200, {

    });

    // res.redirect("/api/session/product", 200, {
    //   message: "Bienvenido/a a mi tienda",
    // });
  } else {
    //     //No esta activa la sesion
         res.redirect("/api/session/login");
  }
};

export const testLogin= async (req, res,next)=> {
  const { email, password } = req.body;
  const user = await getUserByEmail(email)
  console.log('entra al testlogin',user)
  try {
    if (!req.user) {
      req.session.login=false
      return res.status(400).send({status:'error', error:'Invalidate user'})
    }
    //genero la sesion del usuario
    req.session.user={
        first_name:req.user.first_name,
        last_name:req.user.last_name,
        email:req.user.email,
        age:req.user.age
    }
    req.session.login=true
//    res.status(200).send({status:'success', payload:req.user})
    console.log('req.user',req.user)
    res.redirect("/api/session/product");

  } catch (error) {
    return res.status(500).send({
      status:'error', error:error.message
    });
  }
};


export const testLoginJWT= async (req, res, next) => {
  //    const { email,password } = req.body
      passport.authenticate('login', { session: false }, async (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({ message: err });
        }
        try {
          const accessToken=generateToken(user)
          console.log(accessToken)
          res.cookie('jwtCookie', accessToken, { httpOnly: true });
          res.redirect('/api/session/product')
          // res.json({ message: 'Inicio de sesión exitoso' });
        } catch (err) {
          next(err);
        }
      })(req, res, next);
}
  



export const destroySession = (req, res, next) => {
  if (req.session.login) {
      req.session.destroy(() => {
      res.redirect("/api");
    });
  }
};

export const product = (req, res, next) => {
  res.render("product", {
    message: "Bienvenido/a a mi tienda",
    user:req.user.user
  });
};

  // const getUserByEmail = async (email) => {

  //   try {
  //       const managerUser=await getManagerUsers()
  //       console.log('manageruser')
  //       const user = await managerUser.getElementByEmail(email)
  //       if (user) {
  //           return user
  //       }
  //       return 'usuario no encontrado'
  //    } catch (error) {
  //       return error
  //   }
  // }

