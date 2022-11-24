import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from './Navbar';
import Checkbox from './CheckBox';
import Pagination from './Paginations';
import Footer from './Footer';
import Carousel from 'react-bootstrap/Carousel';
import { getProduct } from '../Slices/productSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function MainPage() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
  }, []);

  const products = useSelector((state) => state.product);

  return (
    <div>
    <Navbar/><br/><br/>
    
    <Container>
    <Row >
    <Col xs={2}>{<Checkbox />}</Col> 
    <Col xs={10} >
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
              <Button variant="primary">Edit</Button>
            </Card.Body>
            
          </Card>
        ))}
      
      </Row>
      <Pagination/>
      </Col>
      </Row>
    </Container>
    <Footer/>
    </div>
  );
}

export default MainPage;