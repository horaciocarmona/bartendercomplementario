import ItemListContainer  from "../../components/itemListContainer/ItemList/ItemList";
import ItemCartContainer  from "../../components/itemCartContainer/cartList";
import NavBar from "../../components/NavBar/NavBar"
import ItemDetails from "../../components/itemDetailContainer/itemDetail/itemDetail";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import CartProvider from "../../context/cartContext";
import {Register} from "../../components/register/register.js"
import {Login} from "../../components/login/login.js"


const Router=()=>{
    return(
        <BrowserRouter>
             <CartProvider> 
              <NavBar/>
              <Routes>
                <Route path="/" element={<ItemListContainer/>}></Route>
                <Route path="/*" element={<div>element not found error 404</div>}></Route>
                <Route path="/category/:categoria" element={<ItemListContainer/>}></Route>
                <Route path="/nombre/:nombre" element={<ItemDetails/>}></Route>
                <Route path="/id/:idProducto" element={<ItemDetails/>}></Route>
                <Route path="/cart/:cart" element={<ItemCartContainer/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/login" element={<Login/>}></Route>

               </Routes>
               </CartProvider> 
        </BrowserRouter>
    );

}

export default Router