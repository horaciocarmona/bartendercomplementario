import  {getManagerUsers}  from "../dao/daoManager.js";
//import { createHash } from "../utils/bcrypt.js";

const data = await getManagerUsers()
const managerUser = new data.ManagerUserMongoDB
export  const createUser = async (req, res) => {
    try {
        console.log('createuser',req.body)
        const { first_name, last_name, email, age, password } = req.body
   
        if (email) {
            const user = await managerUser.getElementByEmail(email)
            console.log('getelementbyid',user,email)
            if (user) {
                req.session.login=true                
                req.session.user=user    
                res.redirect("/api/session/login")
            } else {
                const rol='user'
                await managerUser.addElements([{ first_name, last_name, email, age, password,rol}])
                req.session.login=true                
                req.session.user={ first_name, last_name, email, age, password,rol}    
                res.redirect("/api/session/login")
            }
        } else {
            return res.status(200).send({
                message: "debe registarse"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        console.log('logeo getuserbyid',email,managerUser)
        const user = await managerUser.getUserById(id)
        if (user) {
            console.log('usuario encontrado',user)

            return res.status(200).send({
                message: user
            })
        }
        console.log('usuario no encontrado',id)
        return res.status(200).send({
            message: "Usuario no encontrado"
        })
    } catch (error) {
         res.status(500).send({
            message: error.message
        })
    }
}

export const getUserByEmail = async (email) => {
    try {
        console.log('logeo getuserbyemail',email,managerUser)
        const user = await managerUser.getElementByEmail(email)
        if (user) {
            return user
        }
        return res.status(200).send({
            message: "Usuario no encontrado"
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const register = async (req, res, next) => {
    console.log('register',req.session.user)
    const { first_name, last_name, email, age, password } = req.session.user;
    console.log('email',email)
    if (email) {
        console.log('await',email)
        const user = await managerUser.getElementByEmail(email)
        console.log('user',user)
        if (user) {
            req.session.login=true
            req.session.user=user
            res.redirect("/api/session/login", {
                message: 'el usuario ya esta creado'
                //Indicar que el email ya esta registrado
            })
        } else {
              res.redirect("/api/users", {
                message: 'el usuario se creo correctamente'
            })
        }
    } else {
        return res.status(200).send({
            message: "debe registarse"
        })
    }
}