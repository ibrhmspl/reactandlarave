import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getTmpStore, updateTmpStore } from '../Slices/tmpStoreSlice';

function StaticExample() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getTmpStore());
  },[]);


  const tmpstores = useSelector((state) => state.tmpstore);
 

  const handleStoreUptade = (tmpstore) => {
      dispatch(updateTmpStore(tmpstore.id));
  };

  return (
    <>
    <Modal.Dialog style={{width:'800px', height:'600px'}}>
      <Modal.Header>
      </Modal.Header>
      <Modal.Body>
      <Table striped>
      <thead>
        <tr>
          <th>Name</th>
          <th>Telefon</th>
          <th>Adress</th>
          <th>email</th>
          <th>ONAY</th>
        </tr>
      </thead>
      <tbody>
      {tmpstores?.map((tmpstore) => (

        <tr key={tmpstore.id}>
          <td name='name'>{tmpstore.name}</td> 
          <td name='tel'>{tmpstore.tel}</td>
          <td name='adress'>{tmpstore.adress}</td>
          <td name='email'>{tmpstore.email}</td>
          <td><Button onClick={()=>handleStoreUptade(tmpstore)}>EKLE</Button></td>
        </tr>
        ))}
      </tbody>
    </Table>
      </Modal.Body>
    </Modal.Dialog>
    </>
  );
}

export default StaticExample;