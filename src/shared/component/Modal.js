import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap'

const Model = props => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false)
    props.onClear()
  };

  return <Modal show={show} onHide={handleClose}>
      <Modal.Header style={{backgroundColor: '#0C0C52'}}>
        <Modal.Title style={{color: 'white'}}>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Okay
        </Button>
      </Modal.Footer>
    </Modal>;
};

export default Model;