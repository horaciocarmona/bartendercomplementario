// import {getFirestore,collection, getDocs} from "firebase/firestore"

// const productos=[{descripcionProducto:"Ron Avana Club clasico 700ml",precioVentaUnitario:6300,stockProducto:165,img:"https://i.ibb.co/dkSGG4j/ronavanaclub.png",id:1,cantidad:0,pais:"FI",category:"grande"},
//      {descripcionProducto:"Campari 750ml",precioVentaUnitario:1800,stockProducto:3,img:"https://i.ibb.co/nLWSGVq/campari.png",id:2,cantidad:0,pais:"MX",category:"grande"},
//      {descripcionProducto:"Gin Bombay Bramble 700",precioVentaUnitario:3800,stockProducto:150,img:"https://i.ibb.co/Bg4h1Lh/bombaybramle.png",id:3,cantidad:0,pais:"AR",category:"mediano"},
//      {descripcionProducto:"Capel reservado clasico 700ml",precioVentaUnitario:4200,stockProducto:300,img:"https://i.ibb.co/Sn3116s/capelreservadotransparente-Copy.png" ,id:4,cantidad:0,pais:"BZ",category:"mediano"},
//      {descripcionProducto:"Negroni 750ml",precioVentaUnitario:5000,stockProducto:190,img:"https://i.ibb.co/BCDVhRZ/negroni14.png",id:5,cantidad:6,pais:"US",category:"grande"},
//      {descripcionProducto:"Heraclito clasico 700ml",precioVentaUnitario: 4500,stockProducto:180,img:"https://i.ibb.co/gmPYvrJ/heraclitolondondry.png",id:6,cantidad:0,pais:"BR",category:"mediano"},
//      {descripcionProducto:"Whisky Jack Daniels 750ml",precioVentaUnitario:12000,stockProducto:178,img:"https://i.ibb.co/Hhd6kgv/whiskyjackdaniels.jpg",id:7,cantidad:0,pais:"FI",category:"grande"},
//      {descripcionProducto:"Puerto de Indias clasico 700ml",precioVentaUnitario:6300,stockProducto:165,img:"https://i.ibb.co/pRVjpBw/puertodeindiasclasic.png",id:8,cantidad:0,pais:"AR",category:"grande"}];

    const productosApi = async() => {

        // const db=getFirestore();
        // const itemCollectionRef= collection(db,"items")
        // const productoPromise = await (
        //     getDocs(itemCollectionRef).then((snapshot)=>{
        //         let listProducts=[];    
        //         snapshot.docs.map(
        //             (doc)=>{ 
        //                 listProducts.push({...doc.data(),idDoc:doc.id});
        //             }

        //             )
        //         console.log(listProducts);

        //         return listProducts;
        //     })
        // )
      
        // const productos = productoPromise.map((productos) => ({
        //         id:productos.id,
        //         category:productos.category,
        //         nombre:productos.descripcionProducto,
        //         imagen:productos.img,
        //         precio:productos.precioVentaUnitario,
        //         stockProducto:productos.stockProducto,
        //         idDoc:productos.idDoc

        // }))
        
        // return productos
    }

    export const getProductoById= async (id)=>{
        // const db=getFirestore();
        // const itemCollectionRef= collection(db,"items")
        // const unProductoPromise = await (
        //     getDocs(itemCollectionRef).then((snapshot)=>{
        //         let listProducts=[];    
        //         snapshot.docs.map(
        //             (doc)=>{ 
        //                 listProducts.push({...doc.data(),idDoc:doc.id});
        //             }
        //         )
        //         return listProducts;
        //     })
        //)
      
        // const productos = unProductoPromise.map((productos) => ({
        //         id:productos.id,
        //         category:productos.category,
        //         nombre:productos.descripcionProducto,
        //         imagen:productos.img,
        //         precio:productos.precioVentaUnitario,
        //         stockProducto:productos.stockProducto,
        //         idDoc:productos.idDoc

        // }))

        // const unProducto=productos.find(element=>element.id===parseInt(id));   
        // console.log(unProducto);
        
        // return unProducto

    }
        
    export default productosApi;

        