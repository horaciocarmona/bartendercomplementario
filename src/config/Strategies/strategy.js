import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { createUser, findUserById } from '../../services/UserServices.js'

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // jwtCookieName: "jwt",
    secretOrKey: process.env.PRIVATE_KEY_JWT //desenscriptar
}

export const strategyJWT = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await findUserById(payload._id)
        console.log(user)
        if (!user) {
            return done(null, false)
        }

        return done(null, user)

    } catch (error) {
        return done(error, false)
    }
})

export const current = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        console.log('finduserbyid',payload.user.id)
        const user = await findUserById(payload.user.id)
        console.log(user)
        if (!user) {
            return done(null, false)
        }

        return done(null, user)

    } catch (error) {
        return done(error, false)
    }
})
  
