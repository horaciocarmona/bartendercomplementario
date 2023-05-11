import Count from "../count/count"
import { useState } from "react"

const CountContainer=()=>{
    const [count, setCount] = useState(0)
    const [habilitado, setHabilitado] = useState(false)
    let handleClick = () => {
        setCount(count + 1);
        setHabilitado(true);
    }

    return(
        <Count 
            handleClick={handleClick}
            habilitado={habilitado}
            count={count}
        />

    )
}
export default CountContainer;