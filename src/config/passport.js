import passport from 'passport'
import { strategyJWT,current } from '../config/Strategies/strategy.js'

const initializePassport = () => {
    console.log('current')
    passport.use("current",current)
//    passport.use(strategyJWT)
}

export default initializePassport


// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import { createUser, findUserById } from '../services/UserServices.js'

// const jwtOptions = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: process.env.PRIVATE_KEY_JWT
// }

// export const strategyJWT = new JwtStrategy(jwtOptions, async (payload, done) => {
//     try {
//         const user = await findUserById(payload._id)
//         console.log(user)
//         if (!user) {
//             return done(null, false)
//         }

//         return done(null, user)

//     } catch (error) {
//         return done(error, false)
//     }
// })

// // import local from "passport-local";
// // import passport from "passport";
// // // import { managerUser } from "../controllers/user.controller.js";
// // import { managerCart } from "../controllers/cart.controller.js";
// // import { createHash, validatePassword } from "../utils/bcrypt.js";
// // import GitHubStrategi from "passport-github2";
// // import { generateToken } from "../utils/jwt.js";
// // import jwt from "passport-jwt";
// // //import { strategyJWT } from './Strategies/jwtStrategy.js'
// // //Passport se va a trabajar como un middleware
// // const LocalStrategy = local.Strategy; //Defino mi estrategia
// // const JWTStrategy = jwt.Strategy;
// // const ExtractJWT = jwt.ExtractJwt; //extractor ya sea del header o cokie,etc

// // const initializePassport = () => {
// //   //Definir donde se aplican mis estrategias
// //   //done seria el .send de esta estrategia
// //   const cookieExtractor = (req) => {
// //     //{} no hay cookies != esta cookie no existe
// //     // si exiten las cookies, asigno mi cookie en especifigo sino
// //     console.log("cookieextractor", req.cookies);
// //     //        const token = req.cookies ? req.cookies['jwtCookie'] : {}
// //     const token = req.cookies ? req.cookies.jwtCookie : {};

// //     console.log("token", token);
// //     return token;
// //   };

// //   passport.use(
// //     "jwt",
// //     new JWTStrategy(
// //       {
// //         jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), // el token
// //         //se extreae desde las cookies
// //         jwtCookieName: "jwtCookie",
// //         secretOrKey: process.env.PRIVATE_KEY_JWT, //desenscriptar
// //       },
// //       async (jwt_payload, done) => {
// //         console.log("payload", jwt_payload);
// //         try {
// //           return done(null, jwt_payload);
// //         } catch (error) {
// //           return done(error);
// //         }
// //       }
// //     )
// //   );

// //   passport.use(
// //     "current",
// //     new JWTStrategy(
// //       {
// //         jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), // el token
// //         //se extreae desde las cookies
// //         jwtCookieName: "jwtCookie",
// //         secretOrKey: process.env.PRIVATE_KEY_JWT, //desenscriptar
// //       },
// //       async (jwt_payload, done) => {
// //         console.log("payload", jwt_payload);
// //         try {
// //           return done(null, jwt_payload);
// //         } catch (error) {
// //           return done(error);
// //         }
// //       }
// //     )
// //   );

// //   // passport.use(
// //   //   "register",
// //   //   new LocalStrategy(
// //   //     {
// //   //       passReqToCallback: true,
// //   //       usernameField: "email",
// //   //     },
// //   //     async (req, username, password, done) => {
// //   //       const { first_name, last_name, email, age } = req.body;
// //   //       console.log("email");
// //   //       try {
// //   //         const user = await managerUser.getElementByEmail(username);
// //   //         if (user) {
// //   //           //null porque no dio error y false porque no hay usuario
// //   //           console.log("user", user);
// //   //           return done(null, false);
// //   //         }
// //   //         //cear carrito y asignarlo al usuario
// //   //         const carrito = await managerCart.addElements();
// //   //         const passwordHash = createHash(password);
// //   //         console.log("carrito", carrito);
// //   //         const userCreated = await managerUser.addElements([
// //   //           {
// //   //             first_name: first_name,
// //   //             last_name: last_name,
// //   //             email: email,
// //   //             age: age,
// //   //             password: passwordHash,
// //   //             id_Cart: carrito[0]._id,
// //   //           },
// //   //         ]);
// //   //         const accessToken = generateToken(userCreated);
// //   //         console.log(accessToken);
// //   //         return done(null, userCreated);
// //   //       } catch (error) {
// //   //         return done(error);
// //   //       }
// //   //     }
// //   //   )
// //   // );

// //   //Inicializar la session del user
// //   passport.serializeUser((user, done) => {
// //     if (Array.isArray(user)) {
// //       done(null, user[0]._id);
// //     } else {
// //       done(null, user._id);
// //     }
// //   });

// //   //Eliminar la session del user
// //   passport.deserializeUser(async (id, done) => {
// //     const user = await managerUser.getElementById(id);
// //     done(null, user);
// //   });

// //   passport.use(
// //     "login",
// //     new LocalStrategy(
// //       {
// //         usernameField: "email",
// //       },
// //       async (username, password, done) => {
// //         try {
// //           const user = await managerUser.getElementByEmail(username);
// //           console.log("loginpassport", user, username);
// //           if (!user) {
// //             //Usuario no encontrado
// //             return done(null, false);
// //           }
// //           //            console.log('validate',password,user.password)
// //           if (validatePassword(password, user.password)) {
// //             //Usuario y contraseña validos
// //             const accessToken = generateToken(user);
// //             console.log(accessToken);
// //             return done(null, user);
// //           }

// //           return done(null, false); //Contraseña no valida
// //         } catch (error) {
// //           return done(error);
// //         }
// //       }
// //     )
// //   );

// //   passport.use(
// //     "github",
// //     new GitHubStrategi(
// //       {
// //         clientID: process.env.CLIENT_ID,
// //         clientSecret: process.env.CLIENT_SECRET,
// //         callbackURL: process.env.CALLBACK_URL,
// //       },
// //       async (accessToken, refreshToken, profile, done) => {
// //         try {
// //           console.log("accestocken");
// //           const user = await managerUser.getElementByEmail(profile._json.email);
// //           if (user) {
// //             done(null, user);
// //           } else {
// //             const carrito = await managerCart.addElements();
// //             const userCreated = await managerUser.addElements([
// //               {
// //                 first_name: profile._json.name,
// //                 last_name: "", //porque github no posee nombre y apellido
// //                 email: profile._json.email,
// //                 age: 20, //github no define la edad
// //                 password: "", //no puedo asignar una contraseña porque github ya me ofrece una
// //                 id_Cart: carrito[0]._id,
// //               },
// //             ]);
// //             console.log("userCreated", userCreated);
// //             done(null, userCreated);
// //           }
// //         } catch (error) {
// //           return done(error);
// //         }
// //       }
// //     )
// //   );
// // };

// // export default initializePassport;
// export default initializePassport