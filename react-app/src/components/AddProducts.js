import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../Slices/categoriesSlice';
import { getSubCategories } from '../Slices/subCategoriesSlice';
import { postProduct } from '../Slices/productSlice';

function Example() {

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getCategories());
      dispatch(getSubCategories());
    }, []);

    const categories = useSelector((state) => state.categories);
    const subCategories = useSelector((state) => state.subCategories);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [catId, setCatId] = useState(0);
    function handleChange(e) {
        setCatId(e.target.value);
    }

    const handleProductPost = (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget)
        dispatch(postProduct(data)).then(()=>{
          handleClose();
        });
    };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Products
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleProductPost}>
          <Form.Label>Main Category</Form.Label>
        <Form.Select aria-label="Default select example" onChange={handleChange}>
            <option hidden>Select</option>
        {categories?.map((category)=>(
          <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Form.Select>
        <br/><br/>
        <Form.Label>Sub Category</Form.Label>
        {catId > 0  &&(
        <Form.Select name='sub_category_id' aria-label="Default select example" >
            <option hidden>Select</option>
        {subCategories?.map((subcategory)=>(
            catId==subcategory.main_category_id ?
          <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>:null
          ))}
        </Form.Select>)}
        <br/><br/>
        <Form.Label>Product</Form.Label>
        <Form.Control name='name' type="text" placeholder="Product Name" /><br/>
        <Form.Label >Product Description</Form.Label>
        <Form.Control name="description" type="text" placeholder="Product Description"  />
        <Form.Group className="position-relative mb-3">
            <Form.Label>File</Form.Label>
            <Form.Control name='images[]' type="file" multiple />
          </Form.Group>
          <Button variant="primary" type='submit'>
            Save Changes
          </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;