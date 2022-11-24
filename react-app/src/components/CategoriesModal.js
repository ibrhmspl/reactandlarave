import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCategories } from '../Slices/categoriesSlice';
import { getSubCategories } from '../Slices/subCategoriesSlice';
import AddCategory from './AddCategory';
import EditCatModal from './EditCatModal';

function StaticExample() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategories());
  }, []);

  const categories = useSelector((state) => state.categories);
  const subCategories = useSelector((state) => state.subCategories);

  return (
    
    <>
    <AddCategory/><br/><br/><br/>
    <Modal.Dialog style={{width:'800px', height:'600px'}}>
      <Modal.Header>
      </Modal.Header>
      <Modal.Body>
      <Table striped>
      <thead>
        <tr>
          <th>Sub Categories</th>
          <th>Main Categories</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
      {categories?.map((category) => (
            subCategories?.map((subCategory) =>(
            category.id === parseInt(subCategory?.main_category_id) ?
        <tr key={subCategory.id}>
          <td>{subCategory.name}</td> 
          <td>{category.name}</td>
          <td><EditCatModal/></td>
        </tr>:null
        ))))}
      </tbody>
    </Table>
      </Modal.Body>
    </Modal.Dialog>
    </>
  );
}

export default StaticExample;