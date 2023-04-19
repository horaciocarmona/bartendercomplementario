import local from 'passport-local'
import passport from 'passport'
import { managerUser } from '../controllers/user.controller.js'
import { createHash, validatePassword } from '../utils/bcrypt.js'
import GitHubStrategi from 'passport-github2'
//Passport se va a trabajar como un middleware
const LocalStrategy = local.Strategy //Defino mi estrategia

const initializePassport = () => {
    //Definir donde se aplican mis estrategias
    //done seria el .send de esta estrategia

    passport.use('register', new LocalStrategy(

        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body
            console.log('email')    
            try {
                const user = await managerUser.getElementByEmail(username)
                if (user) {
//null porque no dio error y false porque no hay usuario
                    console.log('user',user)    
                    return done(null, false)
                }
                const passwordHash = createHash(password)
                const userCreated = await managerUser.addElements([{
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    age: age,
                    password: passwordHash
                }])
                console.log(userCreated)
                return done(null, userCreated)
            } catch (error) {
                return done(error)
            }
        }))

    //Inicializar la session del user
    passport.serializeUser((user, done) => {
         if (Array.isArray(user)){
             done(null, user[0]._id)
         }else {
            done(null, user._id)
         }
    })

    //Eliminar la session del user
    passport.deserializeUser(async (id, done) => {
        const user = await managerUser.getElementById(id)
        done(null, user)
    })

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {

        try {
            const user = await managerUser.getElementByEmail(username)
            console.log('loginpassport',user,username)
            if (!user) { //Usuario no encontrado
                return done(null, false)
            }
//            console.log('validate',password,user.password)
            if (validatePassword(password, user.password)) { //Usuario y contraseña validos
                return done(null, user)
            }

            return done(null, false) //Contraseña no valida

        } catch (error) {
            return done(error)
        }
    }))

    passport.use('github',new GitHubStrategi({
        clientID : process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL

    },async (accessToken,refreshToken,profile,done)=>{
        try {
            console.log('accestocken')
            const user=await managerUser.getElementByEmail(profile._json.email)
            if (user){
                done(null,user)
            } else{
                const userCreated = await managerUser.addElements([{
                    first_name: profile._json.name,
                    last_name: '',//porque github no posee nombre y apellido
                    email: profile._json.email,
                    age: 20,//github no define la edad
                    password: '' //no puedo asignar una contraseña porque github ya me ofrece una
                }])
                console.log('userCreated',userCreated)
                done(null, userCreated)

            }

        } catch (error) {
            return done(error)
        }
    }))


}

export default initializePassport
