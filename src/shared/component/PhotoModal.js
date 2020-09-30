import React, {useState} from 'react';
import {Modal} from 'react-bootstrap'

const Model = props => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false)
    props.onClear()
  };

  return <Modal show={show} onHide={handleClose}>
      <Modal.Header style={{backgroundColor: '#020624'}}>
        <Modal.Title style={{color: 'white'}}>Prescription</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <img className="d-block mx-auto w-100 h-100" src={"https://"+props.imagePath} alt="Prescription"/>
        </Modal.Body>
    </Modal>;
};

export default Model;