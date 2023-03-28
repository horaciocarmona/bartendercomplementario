export const getSession=(req,res,next)=>{
    if (req.session.login) {
        return res.redirect('home')

        // return res.redirect('home',{
        //         'divMessage' :"hola"
        // })
    } else {
        return res.redirect('/',{

        })
    }
}

export const testLogin=(req,res,next)=>{
//consultar si usuario esta en la base de datos
    if (req.body.email=="adminCoder@coder.com" && req.body.password=="adminCod3r123"){                        
        req.session.login=true
        res.redirect('home')

    } else {
        res.redirect('/',{
            //enivar mensajes de rrror
        })
       
    }
}

export const destroySession=(req,res,next)=>{
    //salida del usuario 
    if (req.session.login){
        req.session.destroy(()=>{
            res.redirect('/')
        })
    
    }
}

export const home=(req,res,next)=>{
    res.render('home', {

    })
}

export const register=(req,res,next)=>{
    const {first_name,last_name,email,age,password}=req.body
    //pasword se deberia guardar encriptada
    //const user=userModel.find() buscar por email
    // si existe usuario hacer res.redirect('/',{indicar que email esta registrado})
    // const user=await userModel.find()
    // if (user)  {
    //     res.redirect('/',{
    //         'indicar usuario ya registrado'
    //     })
    // } else {
    //     await userModel.addelement([user])
    //     res.redirect('/',{
    //         'indicar que el usuario se creo correctamente'
    //     })
    // }
}
