import passport from "passport";

//Funcion general para retornar errores en las estrategias de Passport
export const passportError = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            console.log('áutenticate',user,error)
            if (error) {
                return next(error)
            }
            if (!user) { //Si no existe mi usuario
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() }) //Si existe una propiedad messages en info, la envio sino envio pasado a String el objeto info
                // done(null, false, {
                //     message: 'Uuario no encontrado'
                // })
            }

            req.user = user
            next()
        })(req, res, next)

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
        if (req.user.user.rol != rol) {
            return res.status(403).send({
                error: "User no tiene los permisos necesarios"
            })
        }
        next()
    }
}