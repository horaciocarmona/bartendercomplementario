import EErrors from "../errors/enums.js"
export const errorHandler= (error,req,res,next)=>{
     switch(error.code){
       case EErrors.INVALID_TYPES_ERROR :
         return res.status(500).send({status:"error",error:error.name,cause:error.cause})
         break;
       default:
         return res.status(500).send({status:"error",error:error.message})  
     }
     next(error)
  }
  
  export default errorHandler