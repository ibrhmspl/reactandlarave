import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProduct } from '../Slices/productSlice';
import AddProducts from './AddProducts';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import EditProductModal from './EditProductModal';

function StaticExample() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
  }, []);

  const products = useSelector((state) => state.product);
  

  return (
    <>
    <Modal.Dialog style={{width:'800px', height:'600px'}}>
      <Modal.Header>
        <AddProducts/><br/><br/><br/>
      </Modal.Header>

      <Modal.Body >
      <Row xs={1} md={3} className="g-4">
      {products?.map((product) =>(
            <Card style={{ width: '18rem' }} key={product.id}>
              <Carousel variant="dark"interval={null} indicators={null}>
            <Carousel.Item>
              <Card.Img  alt={product.name} src={'http://127.0.0.1:8000/Image/' + product?.get_photos[0].path} style={{width:"18rem", height:"18rem"}} />
             </Carousel.Item>
            <Carousel.Item>
            <Card.Img  alt={product.name} src={'http://127.0.0.1:8000/Image/' + product?.get_photos[1].path} style={{width:"18rem", height:"18rem"}} /></Carousel.Item>
            <Carousel.Item>
            <Card.Img  alt={product.name} src={'http://127.0.0.1:8000/Image/' + product?.get_photos[2].path} style={{width:"18rem", height:"18rem"}} /></Carousel.Item>
            </Carousel>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                {product.description}
              </Card.Text>
              <EditProductModal id={product.id} name={product.name} description={product.description}/>
            </Card.Body>
            
          </Card>
        ))}
      
      </Row>
      </Modal.Body>
    </Modal.Dialog>
    </>
  );
}

export default StaticExample;