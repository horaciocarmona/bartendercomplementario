//import CategoryButton from "./CategoryButton/CategoryButton"
import CategoryButton from "./CategoryButton/CategoryButton"
import "./NavBar.scss"
import CartWidget from './CartWidget/CartWidget';
import {Link} from "react-router-dom"
function NavBar(){
    return (
        <div>
            <CategoryButton
                nombre="BarTender HC"
            />
            <Link to={"/"} >
                <CategoryButton
                    nombre="Home"
                />
            </Link>
            <Link to={"/category/grande"} >
                <CategoryButton
                    nombre="Grandes"
                />
            </Link>
            <Link to={"/category/mediano"} >
                <CategoryButton
                    nombre="Medianos"
                />
            </Link>
            <Link to={"/cart/carrito"} >
                <CartWidget
                     nombre=""
                />
            </Link>
            <Link to={"/register"} >
                <CategoryButton
                    nombre="Registro"
                />
            </Link>
            <Link to={"/login"} >
                <CategoryButton
                    nombre="Login"
                />
            </Link>


        </div>
    )
}
export default NavBar