import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubCategories } from '../Slices/subCategoriesSlice';
import { getProduct } from '../Slices/productSlice';
import {deleteProduct} from '../Slices/productSlice';
import {updateProduct} from '../Slices/productSlice';

function Example({id, name, description}) {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  const [pname, setPName] = useState(name);
  const [photo, setPhoto] = useState([])
  const [pdesc, setPdesc] = useState(description);

  const onImageChange = (e) => {
    
			const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
			setPhoto((prevImages) => prevImages.concat(filesArray));
			Array.from(e.target.files).map(
				(file) => URL.revokeObjectURL(file) // avoid memory leak
			);
		
  };
  const renderPhotos = (source) => {
		return source.map((photo) => {
			return <img src={photo} alt="" key={photo} style={{width:"6rem", height:"6rem"}} />;
		});
	};
  

    useEffect(() => {
        dispatch(getSubCategories());
        dispatch(getProduct());
      }, []);
  
    
      const handleProductDelete = (e) => {
        e.preventDefault();
          dispatch(deleteProduct(id)).then(()=>{
            handleClose();
          })
      };
    
      const handleProductUpdate = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        data.append('id',id);
          dispatch(updateProduct(data)).then(()=>{
              dispatch(getProduct());
              handleClose();
          })
      };
  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleProductUpdate}>
         <Form.Control name='name' value={pname} type="text"  onChange={(e)=>{setPName(e.target.value)}} /><br/>
         <Form.Control name='description' value={pdesc} type="text"   onChange={(e)=>{setPdesc(e.target.value)}}/><br/>
         <Form.Control name='images[]' type="file" multiple onChange={onImageChange} /><br/>
         <div className="result">{renderPhotos(photo)} </div>

         
         <br/>
         <Button variant="primary" onClick={handleProductDelete}>
            Delete
          </Button> 
          <Button variant="primary" type='submit'>
            Update
          </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;