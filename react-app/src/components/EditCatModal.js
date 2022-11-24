import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../Slices/categoriesSlice';
import {deleteCategories} from '../Slices/categoriesSlice';
import {updateCategories} from '../Slices/categoriesSlice';
import { getSubCategories } from '../Slices/subCategoriesSlice';
import {deleteSubCategories} from  '../Slices/subCategoriesSlice';
import {updateSubCategories} from  '../Slices/subCategoriesSlice';

function Example() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  const [categoryId, setCategoryId] = React.useState('');
  const [subCategoryId, setSubCategoyId] =React.useState('');
  const [name, setName] = React.useState('');
  
  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const handleChange = (e) => {
    setCategoryId(e.target.value);
  }

  const handleChangeSub = (e) => {
    setSubCategoyId(e.target.value);
  }

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getSubCategories());
      }, []);
  
      const categories = useSelector((state) => state.categories);
      const subCategories = useSelector((state) => state.subCategories);
    
    const handleCategoryDelete = (e) => {
        e.preventDefault();
          dispatch(deleteCategories(categoryId)).then(()=>{
            handleClose();
          })
      };
      const handleCategoryUptade = (e) => {
        e.preventDefault();
          dispatch(updateCategories({categoryId,name}));
          dispatch(getCategories());
      };

      const handleSubCategoryDelete = (e) => {
        e.preventDefault();
          dispatch(deleteSubCategories(subCategoryId)).then(()=>{
            handleClose();
          })
      };
      const handleSubCategoryUptade = (e) => {
        e.preventDefault();
          dispatch(updateSubCategories({categoryId,subCategoryId,name})).then(()=>{
            handleClose();
          })
          dispatch(getSubCategories());
      };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
          <Form.Select aria-label="Default select example" onChange={handleChange}>
            <option hidden>Select</option>
        {categories?.map((category)=>(
          <option key={category.id} value={category.id}>{category.name}</option>
          ))}
         </Form.Select><br/>
         <Form.Control type="text" placeholder="New Category Name" onChange={onChangeName}/><br/><br/>
          <Button variant="primary" onClick={handleCategoryDelete}>
            Delete
          </Button> 

          <Button variant="primary" onClick={handleCategoryUptade}>
            Update
          </Button>
        <br/><br/><br/>
        <Form.Select aria-label="Default select example" onChange={handleChange}>
            <option hidden>Select</option>
        {categories?.map((category)=>(
          <option key={category.id} value={category.id}>{category.name}</option>
          ))}
         </Form.Select><br/>
         <Form.Select aria-label="Default select example" onChange={handleChangeSub}>
            <option hidden>Select</option>
        {subCategories?.map((subCategory)=>(
          <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
          ))}
         </Form.Select><br/>
         <Form.Control type="text" placeholder="New Category Name" onChange={onChangeName}/><br/>
         <Button variant="primary" onClick={handleSubCategoryDelete}>
            Delete
          </Button> 

          <Button variant="primary" onClick={handleSubCategoryUptade}>
            Update
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;