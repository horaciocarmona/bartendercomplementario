import  {getUserByEmail}  from "./user.controller.js";
export const getSession = (req, res, next) => {
  if (req.session.login) {
    //Si la sesion esta activa en la BDD
          res.redirect("/api/session/product", 200, {
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
      return res.status(400).send({status:'error', error:'Invalidate user'})
    } 
    //genero la sesion del usuario
    req.session.user={
        first_name:req.user.first_name,
        last_name:req.user.last_name,
        email:req.user.email,
        age:req.user.age
    }
//    res.status(200).send({status:'success', payload:req.user})
    console.log('req.user',req.user)
    res.redirect("/api/session/product");
    
  } catch (error) {
    res.status(500).send({
      status:'error', error:error.message
    });
  }
};

export const destroySession = (req, res, next) => {
  if (req.session.login) {
      req.session.destroy(() => {
//      res.redirect("/api/session/login");
    });
  }
};

export const product = (req, res, next) => {
  res.render("product", {
    message: "Bienvenido/a a mi tienda",
    user:req.session.user
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

