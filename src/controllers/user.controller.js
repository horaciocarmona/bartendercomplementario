import { findUsers, createUser } from "../services/UserServices.js";

export const getUsers = async (req, res) => {
    try {
        const users = await findUsers()
        res.status(200).send(users)

    } catch (error) {
        res.status(500).send(error)
    }

}
// import  {ManagerUserMongoDB}  from "../dao/MongoDB/models/User.js";
// export const managerUser =  new ManagerUserMongoDB()

// export  const createUser = async (req, res) => {
//     console.log('entra al createruser')
//     res.status(200).send({status:'success', message:'User created'})
//     // res.redirect("/api/session/login")

// //         try {
// //          console.log('createuser')
// //          const { first_name, last_name, email, age, password } = req.body
// //          if (email) {
// //              console.log('getmanagerusers',await managerUser.getElementByEmail())
// //              const user = await managerUser.getElementByEmail(email)
// //              console.log('getelementbyemail',user,email)
// //              if (user) {
// // //                 req.session.login=true                
// // //                 req.session.user=user    
// // //                 res.redirect("/api/session/login")
// //              } else {
// //                  const passwordHash=createHash(password)
// //                  console.log(passwordHash)
// //                  const userCreated=await managerUser.addElements([{ first_name:first_name, last_name:last_name, email:email, age:age, password:passwordHash}])
// // //                 req.session.login=true                
// // //                 req.session.user={
// // //                     first_name:first_name,
// // //                     last_name:last_name,
// // //                     email:email,
// // //                     age:age,
// // //                     password:passwordHash
// // //                 }    
// // //                 res.redirect("/api/session/login")
// //              }
// //          } else {
// //              return res.status(200).send({
// //                  message: "debe registarse"
// //                    })
// //          }
// //      } catch (error) {
// //          res.status(500).send({
// //              message: error.message
// //          })
// //      }
// }

// export const getUserById = async (req, res) => {
//     const { id } = req.params
   
//     try {
//         console.log('logeo getuserbyid',email,managerUser)
//         // const data=await getManagerUsers()
//         // const managerUser = new data.ManagerUserMongoDB
//         const user = await managerUser.getUserById(id)
//         if (user) {
//             console.log('usuario encontrado',user)

//             return  user
            
//         }
//         console.log('usuario no encontrado',id)
//         return res.status(200).send({
//             message: "Usuario no encontrado"
//         })
//     } catch (error) {
//          res.status(500).send({
//             message: error.message
//         })
//     }
// }

// export const getUserByEmail = async (email) => {
        
//     try {
//         console.log('manageruser')
//         const user = await managerUser.getElementByEmail(email)
//         if (user) {
//             return user
//         }
//         return 'usuario no encontrado' 
//      } catch (error) {
//         return error
//     }
// }


