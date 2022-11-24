import Card from 'react-bootstrap/Card';
import Navbar from './Navbar';
import React,{useState} from 'react';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCategories } from '../Slices/categoriesSlice';
import { getSubCategories } from '../Slices/subCategoriesSlice';
import { getStore } from '../Slices/storeSlice';
import { getProduct } from '../Slices/productSlice';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import {getStoreProduct, postStoreProduct} from '../Slices/storeProductSlice';
import Accordion from 'react-bootstrap/Accordion';
import { getMail } from '../Slices/mailSlice';
import { getUser } from '../Slices/authSlice';

function ImageAndTextExample() {

  const user = JSON.parse(localStorage.getItem('user')) ;
  
  const [catId, setCatId] = useState(0);
  const [subId, setSubId] = useState(0);
  const [productId, setProductId] = useState(0);
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [email, setSEmail] = useState();

  function handleChangeCatId(e) {
      setCatId(e.target.value);
  }
  function handleChangeSubId(e) {
    setSubId(e.target.value);
  }
  function handleChangeProductId(e) {
    setProductId(e.target.value);
  }
  function handleChangeStock(e) {
    setStock(e.target.value);
  }
  function handleChangePrice(e) {
    setPrice(e.target.value);
  }
  function handleChangeMail(e) {
    setSEmail(e.target.value);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategories());
    dispatch(getStore());
    dispatch(getProduct());
    dispatch(getStoreProduct());
    dispatch(getUser());
  }, []);

  const categories = useSelector((state) => state.categories);
  const subCategories = useSelector((state) => state.subCategories);
  const stores = useSelector((state)=>state.store);
  const products = useSelector((state)=>state.product);
  const storeProducts = useSelector((state)=>state.storeProduct);
  const users = useSelector((state)=>state.auth.users);

  const handleStorePost = (e) => {
    e.preventDefault();
      dispatch(postStoreProduct({productId, price, stock})).then(()=>{
        dispatch(getStoreProduct());
      })     
  };

  const handleSendMail = (e) => {
    e.preventDefault();
    dispatch(getMail({email}));
  }

  return (
    <>
    <Navbar/><br/><br/>
      
      <Card style={{left:"23rem", width: '50rem', height: 'auto' }}>
        {stores &&<div>
        <Card.Img variant="top" style={{width:"50rem", height:"15rem", marginBottom:-120}} src={'http://127.0.0.1:8000/Image/' + stores[2]?.get_photos[1]?.path} />
        <Card.Img variant="top" style={{width:"5rem", height:"5rem", borderRadius:'10rem', marginLeft:30, zIndex:0}} src={'http://127.0.0.1:8000/Image/' + stores[2]?.get_photos[0]?.path} />
        <div style={{widht:800, height:4, backgroundColor:"grey",marginTop:10,marginTop:-50}}></div>
        <div style={{marginLeft:200, color:"white"}}>{stores[2]?.name}</div> 
        </div>}
         
        <Card.Body style={{marginTop:100}}>
        
      <Card.Body style={{backgroundColor:"grey"}} >
      <Form.Label>Add Product</Form.Label><br/>
      <Row className="g-2">
      <Col md>
      <Form.Label>Main Categories</Form.Label>
      <Form.Select style={{width:"8rem"}}  aria-label="Default select example" onChange={handleChangeCatId}>
            <option hidden>Select</option>
        {categories?.map((category)=>(
          <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Form.Select><br/>
        </Col>
        <Col md>
        <Form.Label>Sub Categories</Form.Label>
        {catId > 0  &&(
        <Form.Select style={{width:"8rem"}} aria-label="Default select example" onChange={handleChangeSubId}>
            <option hidden>Select</option>
        {subCategories?.map((subcategory)=>(
            catId==subcategory.main_category_id ?
          <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>:null
          ))}
        </Form.Select>)}<br/>
        </Col>
        <Col md>
        <Form.Label>Product</Form.Label>
        {subId > 0  &&(
        <Form.Select style={{width:"8rem"}} aria-label="Default select example" onChange={handleChangeProductId}>
            <option hidden>Select</option>
        {products?.map((product)=>(
          subId==product.sub_category_id ?
          <option key={product.id} value={product.id}>{product.name}</option>:null
          ))}
        </Form.Select>)}
        </Col>
        <Col md>
        <Form.Label>Stok</Form.Label>
        {productId > 0  &&(
          <Form.Control onChange={handleChangeStock}/>)}

        </Col>
        <Col md>
        <Form.Label>Price</Form.Label>
        {productId > 0  &&(
          <Form.Control onChange={handleChangePrice}/>)}
        </Col>
        <Col md>
        <Form.Label>EKLE</Form.Label><br/>
          <Button onClick={handleStorePost}>Add</Button>
        </Col>
        </Row>
      </Card.Body><br/>
      {user.user.user_level=="1" &&
      <Card.Body style={{backgroundColor:"grey"}}>
      <Form.Label>Add Staff</Form.Label><br/>
      <Form.Label>staff email</Form.Label>
      <Row className="g-2">
      <Col md>
      <Form.Control style={{width:"15rem"}} onChange={handleChangeMail}/>
      </Col>
      <Col>
      <Button onClick={handleSendMail}>ADD STAFF</Button>
      </Col>
      </Row>
      </Card.Body>}<br/>

      <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Products</Accordion.Header>
        <Accordion.Body>
      <Table striped>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price </th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
      {products?.map((product) => (
            storeProducts?.map((storeProduct) =>(
              product.id === parseInt(storeProduct?.product_id) ?
        <tr key={storeProduct.id}>
          <td>{product.name}</td> 
          <td>{storeProduct.price}</td>
          <td>{storeProduct.stock}</td>
        </tr>:null
        ))))}
      </tbody>
    </Table>
    </Accordion.Body>
      </Accordion.Item><br/>
      {user.user.user_level=="1" &&
      <Accordion.Item eventKey="1">
        <Accordion.Header>Çalışanlar</Accordion.Header>
        <Accordion.Body>
      <Table striped>
      <thead>
        <tr>
          <th>Name</th>
          <th>email </th>
        </tr>
      </thead>
      <tbody>
         {users?.map((user)=>(
          user.user_level=== '2' ?
          <tr key={user.id}>
          <td>{user.name}</td> 
          <td>{user.email}</td>
        </tr>:null
          ))}
      </tbody>
    </Table>
    </Accordion.Body>
      </Accordion.Item>}
      </Accordion>
        </Card.Body>
      </Card>
      <br/>
    </>
  );
}

export default ImageAndTextExample;