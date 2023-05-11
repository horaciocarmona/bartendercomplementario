import "./ItemList.scss"
import {useState,useEffect} from "react"
import Item from "../../itemListContainer/ItemList/item/item"
import productosApi from "../../ApiRest/productosApi"
import {useParams} from "react-router-dom"
// import {doc,getFirestore,collection, getDocs,query,where,addDoc,updateDoc,writeBatch} from "firebase/firestore"
import Button from 'react-bootstrap/Button';

const ItemList=()=>{
    const [filter,setFilter]=useState("");
    const [listProducts,setListadoProductos]=useState([]);
    const {categoria}=useParams();
    const [numberCount,setNumberCount]=useState(0);
    // console.log(productosApi());
     const getProductos = async() => {
         const productos = await productosApi();
         setListadoProductos(productos);
     };

    useEffect(()=>{
        getProductos();
        },[]);

    useEffect(()=>{setNumberCount(numberCount)},[numberCount]);
    const sendOrder=()=>{
        const order={
            buyer: {email:"horacio@hotmail.com",name:"horacio",number:1,phone:"222-444"},
            items:[{precioVentaUnitario:10,descripcionProducto:"aaaa",cantidad:1}],
            total:100
        }
        // const db=getFirestore();
        // const ordersCollections=collection(db,"ordersCollection");    
        // addDoc(ordersCollections,order).then((id)=>{
            // console.log(id);
        // })    
    }

    const updateOrder=()=>{
        // const db=getFirestore();
        // const orderDoc=doc(db,"ordersCollection","LZ9UkLqMS6PgW05sYyNX");    
        // updateDoc(orderDoc,{total:200});
           
    }

    const batchOrders=()=>{
        // const db=getFirestore();
        // const batch=writeBatch(db);    
        // const orderDoc1=doc(db,"ordersCollection","LZ9UkLqMS6PgW05sYyNX");
        // const orderDoc2=doc(db,"ordersCollection","W5MK9JVd6RTjCfwxaFkA");
        // batch.update(orderDoc1,{total:250});
        // batch.set(orderDoc2,{field:"new field"});
        // batch.commit();
    }
    
    return(

        <div className="Principalcontainer">

                {/* <Button onClick={()=>{sendOrder()}}>send</Button>
                <Button onClick={()=>{updateOrder()}}>update</Button>
                <Button onClick={()=>{batchOrders()}}>batch</Button> */}

                <h1>Producto</h1>
                <input id="filter" name="filter" type="text" value={filter} onChange={(event)=>setFilter(event.target.value)}></input>
                <div className="cards-principal">

                {/* {categoria? 

                 listProducts.filter((producto)=>producto.nombre.includes(filter)).filter((producto)=>producto.category===categoria).map((producto,i) => (

                    <>
                    <Item key={i}
                           id={producto.id}
                           categoria={producto.category}
                           nombre={producto.nombre}
                           imagen={producto.imagen}
                           precio={producto.precio}
                           stockProducto={producto.stockProducto}
                           numberCount={numberCount}

                    />
                    </>
                 ))
                : 
                listProducts.filter((producto)=>producto.nombre.includes(filter)).map((producto,i) => (
                    <Item key={i}
                           id={producto.id}
                           categoria={producto.category}
                           nombre={producto.nombre}
                           imagen={producto.imagen}
                           precio={producto.precio}
                           stockProducto={producto.stockProducto}
                           numberCount={numberCount}
                    />
                 ))
               
                }
 */}
                </div> 
            
            </div>
       
    )
}

export default ItemList;