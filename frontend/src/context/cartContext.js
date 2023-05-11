import {createContext,useState} from "react";
// import {doc,getFirestore,collection, getDocs,query,where,addDoc,updateDoc,writeBatch} from "firebase/firestore"

export const cartContext = createContext({
    cart:[],
    isInCart: ()=>{},
    addToCart: ()=>{},
    removeToCart: ()=>{},
    emptyToCart: ()=>{},
    buyToCart: ()=>{},

    totalCantidadCarrito:0,
    totalImporteCarrito:0.00                                   
}) //Cree el contexto, que seria como la caja "global" (de momento vacia) que voy a compartir entre los componentes

export default function CartProvider ({children}) {
    const [cart, setCart] = useState([]);
    const [totalCantidadCarrito, setTotalCantidadCarrito] = useState(0);
    const [totalImporteCarrito, setTotalImporteCarrito] = useState(0.00);
    const getFromCart=(id)=>{return cart.find(ord =>ord.id===id)};                                                                  
    const isInCart= (id) =>{ return id !== undefined ? getFromCart(id):undefined};

    const emptyToCart = () => {
        setCart([]);
        setTotalCantidadCarrito(0);
        setTotalImporteCarrito(0.00);
    }
 
    const addToCart=(obj)=>{
       if (isInCart(obj.id) && obj.id){
          console.log("ya existe, ya existe");
          const productoExistente=getFromCart(obj.id); 
          productoExistente.cantidad+=obj.cantidad; 
          productoExistente.stockProducto-=obj.cantidad; 

          setTotalCantidadCarrito(totalCantidadCarrito+obj.cantidad)  
          setTotalImporteCarrito(totalImporteCarrito+(obj.cantidad*obj.precioVentaUnitario))  
          setCart([...cart]);
          return
       }


       console.log("nuevo producto "+obj.descripcionProducto);
       obj.stockProducto-=obj.cantidad;
       setCart([...cart,obj]);
       console.log("ingreso al carrito con stock"+obj.stockProducto)
       setTotalCantidadCarrito(totalCantidadCarrito+obj.cantidad)  
       setTotalImporteCarrito(totalImporteCarrito+(obj.cantidad*obj.precioVentaUnitario))  
       console.log(totalCantidadCarrito)
       console.log(totalImporteCarrito)
    }

    const removeToCart=(obj)=>{
        if (isInCart(obj.id) && obj.id){
            console.log("existe, se elimina ");
            console.log(totalCantidadCarrito)
            console.log(obj.cantidad);
            setTotalCantidadCarrito(totalCantidadCarrito-obj.cantidad)  
            setTotalImporteCarrito(totalImporteCarrito-(obj.cantidad*obj.precioVentaUnitario))  
            cart.map((producto,i) => (producto.id===obj.id ? cart.splice(i,1) : undefined ));  
            setCart([...cart]);
            return
        }
 
    
    }

    const buyToCart=(cart)=>{
        // Actualizo ordenes y Stock 
        const order={
            buyer: {email:"juan@hotmail.com",name:"juan",number:1,phone:"1234-5444"},
            items:[...cart],
            total:totalImporteCarrito
        }
        // const db=getFirestore();
        // const ordersCollections=collection(db,"ordersCollection");    
        console.log("order");

        console.log(order);

        // addDoc(ordersCollections,order).then((id)=>{
        //      console.log(order);
        // })    
        console.log("cart");
        console.log(cart);
        stockToItems(cart);
        emptyToCart();
    }   

     const stockToItems=(cartItems)=>{
        console.log("cartitimens");
        console.log(cartItems)

        // const db=getFirestore();
        console.log("cartitimens");
        console.log(cartItems)


        cartItems.map((producto) =>{ 

            // const itemDoc=doc(db,"items",producto.idDoc);    
            console.log("itemdoc");
            // console.log(itemDoc)
    
            // updateDoc(itemDoc,{stockProducto:producto.stockProducto});
    
        });  
    }   

     return (
        <cartContext.Provider value={{cart,addToCart,isInCart,emptyToCart,removeToCart,totalCantidadCarrito,totalImporteCarrito,buyToCart}}>
            {children}
        </cartContext.Provider>
    )
}

