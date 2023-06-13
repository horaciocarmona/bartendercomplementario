import { faker } from '@faker-js/faker';

    ///    
    function obtenerCategoriaAleatoria() {
      const categorias = ['grande', 'mediano', 'chico'];
      const indiceAleatorio = Math.floor(Math.random() * categorias.length);
      return categorias[indiceAleatorio];
    }


    // Generar código de producto
     const generarCodigoProducto = () => {
        // Generar un número aleatorio de 4 dígitos
           const numeroAleatorio = Math.floor(Math.random() * 10000);
           return numeroAleatorio
    }

    // Generar un número aleatorio entre un rango
    const getRandomNumber = (min, max) => {
       return Math.floor(Math.random() * (max - min + 1) + min);
    }    

    const createRandomProducts = () => {
        return {

            title:faker.commerce.productName(),
            description:faker.commerce.productDescription(),
            price:parseFloat(faker.commerce.price()),
            thumpbnail:faker.image.url(),
            code:generarCodigoProducto(),
            stock:getRandomNumber(0,200),
            status:true,
            category:obtenerCategoriaAleatoria(),
        };
    }
    export const findProducts=async ()=> {
    let products = []
 //   products=await createRandomProducts()
     for (let i = 0; i < 100; i++) {
         products.push(createRandomProducts());
     }
    
     return products
    }
    