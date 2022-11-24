import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../Slices/categoriesSlice';
import { createSubCategories } from '../Slices/subCategoriesSlice';

function Example() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [catId, setCatId] = useState(0);
    function handleChange(e) {
        setCatId(e.target.value);
    }

    useEffect(() => {
      dispatch(getCategories());
    }, []);

    const categories = useSelector((state) => state.categories);

    const handleSubCategoryPost = (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget)
        dispatch(createSubCategories(data));
    };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add subCategories
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubCategoryPost}>
          <Form.Select name='main_category_id' aria-label="Default select example" onChange={handleChange}>
            <option hidden>Select</option>
        {categories?.map((category)=>(
          <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Form.Select>
        <Form.Label>SubCategories </Form.Label>
        <Form.Control name='name' type="text" placeholder="SubCategory Name" /><br/>
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