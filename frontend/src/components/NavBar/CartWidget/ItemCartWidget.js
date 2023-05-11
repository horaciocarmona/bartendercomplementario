import "./itemCartWidget.scss"

import {Link} from "react-router-dom"
import {useContext} from "react"
import {cartContext} from "../../../context/cartContext"

const ItemCartWidget=(props)=>{
    const {totalCantidadCarrito}=useContext(cartContext)
    const {totalImporteCarrito}=useContext(cartContext)
    return (
        <div className="itemCartWidget">
            <Link to={"/cart/:cart"}>
            <i>
                <img src={props.imagen} width="40" height="40" alt="imagen carrito"/>
            </i>
            </Link>
            <p>Unidades ${totalCantidadCarrito} </p>
            <p>Importe ${totalImporteCarrito} </p>
        </div>
    )
}

export default ItemCartWidget;