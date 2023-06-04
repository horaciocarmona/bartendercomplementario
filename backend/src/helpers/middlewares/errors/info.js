export const generateUserErrorInfo=(user)=>{
    console.log(`alguna de estas propiedades esta incompleta
    *first_name: es un string y recibio ${user.first_name}
    *last_name: es un string y recibio ${user.last_name}
    *age: es un numero y recibio ${user.age}
    *email: es un string y recibio ${user.email}
    *password: es un string y recibio ${user.password==undefined?undefined:"un valor"}
    
    `)
    return `alguna de estas propiedades esta incompleta
            *first_name: es un string ,recibio ${user.first_name}
            *last_name: es un string , recibio ${user.last_name}
            *age: es un numero , recibio ${user.age}
            *email: es un string , recibio ${user.email}
            *password: es un string , recibio ${user.password==undefined?undefined:"un valor"}
            
            `.split('\n')
}

export const generateLoginUserErrorInfo=(user)=>{
    console.log(`alguna de estas propiedades esta incompleta
    *email: es un string y recibio ${user.email}
    *password: es un string y recibio ${user.password==undefined?undefined:"un valor"}
    
    `)
    return `alguna de estas propiedades esta incompleta
            *email: es un string , recibio ${user.email}
            *password: es un string , recibio ${user.password==undefined?undefined:"un valor"}
            
            `.split('\n')
}

export const generateProductErrorInfo=(product)=>{
    
    return `alguna de estas propiedades esta incompleta
        *description: es un string y recibio ${product.description}
        *code: es un numero y recibio ${product.code}
        *price: es un numero y recibio ${product.price}
        *status: es logica y recibio ${product.status}
        *stock: es un numero y recibio ${product.stock}
        *category: es un string y recibio ${product.category}
        *thumpbnail: es una imagen y recibio ${product.thumpbnail}
        `.split('\n')
}

export const generateProductAddErrorInfo=(product)=>{
    
    return `alguna de estas propiedades esta incompleta
        *description: es un string y recibio ${product.description}
        *code: es un numero y recibio ${product.code}
        *price: es un numero y recibio ${product.price}
        *status: es logica y recibio ${product.status}
        *stock: es un numero y recibio ${product.stock}
        *category: es un string y recibio ${product.category}
        `.split('\n')
}
