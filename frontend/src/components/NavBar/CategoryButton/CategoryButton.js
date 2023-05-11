import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoryButton = (props)=>{
    return (
        <>
          <Button variant="primary">{props.nombre}</Button>{' '}
        </>
    );
}

export default CategoryButton;