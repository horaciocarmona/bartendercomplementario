import  {getManagerUsers}  from "../dao/daoManager.js";
import { createHash } from "../utils/bcrypt.js";
const data=await getManagerUsers()
const managerUser = data.ManagerUserMongoDB
//  const managerUser = await getManagerUsers()

export  const createUser = async (req, res) => {
   console.log('createuser')
//    const data=await getManagerUsers()
//    const managerUser = data.ManagerUserMongoDB
    //  const data=await getManagerUsers()
    //  const managerUser = new data.ManagerUserMongoDB
   
   try {
        console.log('createuser',managerUser)
        const { first_name, last_name, email, age, password } = req.body
   
        if (email) {
            console.log('getmanagerusers',managerUser)

            const user = await managerUser.getElementByEmail(email)
            console.log('getelementbyemail',user,email)
            if (user) {
                req.session.login=true                
                req.session.user=user    
                res.redirect("/api/session/login")
            } else {
//                const rol='User'
                const passwordHash=createHash(password)
                console.log(passwordHash)
                const userCreated=await managerUser.addElements([{ first_name:first_name, last_name:last_name, email:email, age:age, password:passwordHash}])
                req.session.login=true                
                req.session.user={
                    first_name:first_name,
                    last_name:last_name,
                    email:email,
                    age:age,
                    password:passwordHash
                }    
                res.redirect("/api/session/login")
//                res.status(200).json({message:userCreated})
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
        // const data=await getManagerUsers()
        // const managerUser = new data.ManagerUserMongoDB
        const user = await managerUser.getUserById(id)
        if (user) {
            console.log('usuario encontrado',user)

            return  user
            
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
//        console.log('logeo getuserbyemail',email,managerUser)
//        console.log('getmanageruser',getManagerUsers())
        // const data=await getManagerUsers()
        // const managerUser = new data.ManagerUserMongoDB
        console.log('manageruser')
        const user = await managerUser.getElementByEmail(email)
        if (user) {
            return user
        }
        return 'usuario no encontrado' 
     } catch (error) {
        return error
    }
}

export const register = async (req, res, next) => {
    console.log('register')
//    const data=await getManagerUsers()
//    const managerUser = new data.ManagerUserMongoDB
 
    const { first_name, last_name, email, age, password } = req.body;
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

