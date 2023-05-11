import "./CartWidget.scss"
import ItemCartWidget from "../CartWidget/ItemCartWidget"; 
const CartWidget=()=>{
    return(
        <div className="itemCart">
            <ItemCartWidget
                imagen="https://i.ibb.co/gwzNGhN/carrito-de-compras.png"
            />
        </div>
    )
}


export default CartWidget;