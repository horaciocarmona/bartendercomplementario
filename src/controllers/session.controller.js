
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
         res.redirect("/api", 500, {
//          res.redirect("/api/session/testLogin", 500, {

   });
  }
};

export const testLogin = async (req, res,next) => {
  try {
    console.log("login");
    console.log("email", req.body);
    const { email, password } = req.body;
    if (email == "adminCoder@coder.com" && password == "adminCod3r123") {
      req.session.user=req.body
      req.session.login = true;
      res.redirect("/api/session/product");
    } else {
      console.log("registrese");
      res.redirect("/api/users/loginregister", 200, {
        message: "registrese para iniciar session",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

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
    user:req.session.user
  });
};


