import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';



//Funcion general para retornar errores en las estrategias de Passport
export const passportError = (strategy) => {
    return async (req, res, next) => {
        const authorizationHeader = req.cookies.jwt;
        console.log('autorization',authorizationHeader)
        if (authorizationHeader) {
          const token = authorizationHeader.replace('Bearer ', '');
          req.headers['authorization'] = `Bearer ${token}`;
        }
      
       
        passport.authenticate(strategy,{session:false}, (error, user, info) => {
            console.log('áutenticate',user)
            if (error) {
                return next(error)
            }
            if (!user) { //Si no existe mi usuario
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() }) //Si existe una propiedad messages en info, la envio sino envio pasado a String el objeto info
                // done(null, false, {
                //     message: 'Uuario no encontrado'
                // })
            }

            req.user = user;
            next();
        })(req, res, next);

    }
}

export const authorization = (rol) => {
    return async (req, res, next) => {
        if (!req.user) { //No hay un usuario
            return res.status(401).send({
                error: "User no autorizado"
            })
        }
        console.log('req.user',req.user) //Acceso a las propiedades del user en JWT
        if (req.user.rol != rol) {
            return res.status(403).send({
                error: "User no tiene los permisos necesarios"
            })
        }
        next()
    }
}