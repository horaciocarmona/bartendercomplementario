// import  {getUserByEmail}  from "./user.controller.js";
import { generateToken } from "../utils/jwt.js";
import passport from "passport";
import { createUser, findUserByEmail } from "../services/UserServices.js";
import jwt from "jsonwebtoken";
import { validatePassword, createHash } from "../utils/bcrypt.js";
import CustomError from "../helpers/middlewares/errors/CustomError.js";
import EErrors from "../helpers/middlewares/errors/enums.js";
import { generateUserErrorInfo } from "../helpers/middlewares/errors/info.js";
import { generateLoginUserErrorInfo } from "../helpers/middlewares/errors/info.js";

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

export const testLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  console.log("entra al testlogin", user);
  try {
    if (!req.user) {
      req.session.login = false;
      return res
        .status(400)
        .send({ status: "error", error: "Invalidate user" });
    }
    //genero la sesion del usuario
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
    };
    req.session.login = true;
    //    res.status(200).send({status:'success', payload:req.user})
    console.log("req.user", req.user);
    res.redirect("/api/session/product");
  } catch (error) {
    return res.status(500).send({
      status: "error",
      error: error.message,
    });
  }
};

export const testLoginJWT = async (req, res, next) => {
  //    const { email,password } = req.body
  passport.authenticate(
    "login",
    { session: false },
    async (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: err });
      }
      try {
        const accessToken = generateToken(user);
        console.log(accessToken);
        res.cookie("jwt", accessToken, { httpOnly: true });
        res.redirect("/api/session/product");
      } catch (err) {
        next(err);
      }
    }
  )(req, res, next);
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
    user: req.user.user,
  });
};

export const registerUser = async (req, res, next) => {
  const { first_name, last_name, email, age, password } = req.body;
  try {
    if (!first_name || !last_name || !email || !age || !password) {
      req.logger.error(`No se puede crear el usuario por falta de algun dato pedido (first_name, last_name, email, age, password)`);
      CustomError.createError({
        name: "User created error",
        cause: generateUserErrorInfo({
          first_name,
          last_name,
          email,
          age,
          password,
        }),
        message: "Error trying to create user",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }
    const userBDD = await findUserByEmail(email);
    if (userBDD) {
      req.logger.info(
        `Usuario de mail ${userBDD.first_name} ya esta registrado`
      );
      res.status(401).send("Usuario ya registrado");
    } else {
      const hashPassword = createHash(password);
      const newUser = await createUser({
        first_name,
        last_name,
        email,
        age,
        password: hashPassword,
      });
      const token = jwt.sign(
        { user: { id: newUser._id } },
        process.env.PRIVATE_KEY_JWT,
        {
          expiresIn: "12h",
        }
      );
      req.logger.info(
        `Se registro el Usuario ${first_name} `
      );

      res.cookie("jwt", token, { httpOnly: true });
      res.status(201).json({ token });
    }
  } catch (error) {
    req.logger.error(`No se puede registrar el usuario por ${error}`);
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      req.logger.info(
        `falta email o password, dato pedido para el login`
      );
      CustomError.createError({
        name: "User logged error",
        cause: generateLoginUserErrorInfo({ email, password }),
        message: "Error login user",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }
    passport.authenticate(
      "current",
      { session: false },
      async (err, user, info) => {
        if (err) {
          req.logger.error(`Error en consulta de token en usuario ${user.last_name} por ${err}`);
          return res.status(401).send("Error en consulta de token");
        }
        if (!user) {
          //El token no existe, entonces consulto por el usuario
          const { email, password } = req.body;
          const userBDD = await findUserByEmail(email);
          if (userBDD instanceof Error) {
            req.logger.error(`Error en la coneccion a al base de datos ${userBDD}`);
            return res.status(400).json({
              message: "Error en coneccion a BDD",
            });
          } else {
            if (!userBDD) {
              req.logger.error(
                `Usuario de email ${email} no encontrado`
              );
              return res.status(401).send("User no encontrado");
            }
            if (!validatePassword(password, userBDD.password)) {
              // Contraseña no es válida
              req.logger.info(
                `contraseña invalida del ususario ${userBDD.first_name}`
              );

              return res.status(401).send("Contraseña no valida");
            }
            req.logger.info(
              `El usuario ${userBDD.first_name} ha iniciado sesión correctamente.`
            );
            // Ya que el usuario es valido, genero un nuevo token
            const token = jwt.sign(
              { user: { id: userBDD._id } },
              process.env.PRIVATE_KEY_JWT,
              {
                expiresIn: "12h",
              }
            );
            res.cookie("jwt", token, { httpOnly: true });
            return res.status(200).json({ token });
          }
        } else {
          //El token existe, asi que lo valido
          req.logger.warn(`El usuario ${user.last_name} ya habia obtenido un token`);
          const token = req.cookies.jwt;
          jwt.verify(
            token,
            process.env.PRIVATE_KEY_JWT,
            async (err, decodedToken) => {
              if (err) {
                req.logger.error(`Credencial no valida del usuario ${user.last_name} error: ${err}`);
                return res.status(401).send("Credenciales no válidas");
              } else {
                // Token valido
                req.logger.info(
                  `El usuario ${userBDD.first_name} ha iniciado sesión correctamente.`
                );
                res.cookie("jwt", token, { httpOnly: true });
                req.user = user;
                next();
              }
            }
          );
        }
      }
    )(req, res, next);
  } catch (error) {
    req.logger.error(`No se puede logear el usuario por ${error}`);
    next(error);
  }
};
