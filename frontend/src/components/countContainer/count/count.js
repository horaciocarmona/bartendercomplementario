import * as React from 'react';
import Button from 'react-bootstrap/Button';

const Count=({handleClick,habilitado,count})=>{

    return (

        <div>
            <Button disabled={habilitado} onClick={handleClick}>
                click
            </Button >
            <p>Contador : <span>{count}</span></p>
        
            
        </div>
    )    
}
export default Count;
