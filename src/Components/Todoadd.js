import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export function Todoadd({ data, onDelete, onEdit }) {
  const [selectedOption, setSelectedOption] = useState(data.status);
  const [showModal, setShowModal] = useState(false);
  const [editedTodo, setEditedTodo] = useState(data);
  const [editIndex, setEditIndex] = useState(null);
  
  const handleClose = () =>{
    setEditedTodo(data);
     setShowModal(false)};
  const handleShow = (index) =>{
    setEditIndex(index);
     setShowModal(true)};

  const handleSave = () => {
    onEdit(editedTodo, editIndex);
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.trim() !== '') {
      setEditedTodo({
      ...editedTodo,
      [name]: value
    });
  }
  };

  return (
    <Col>
      <Card className='cardmargin'>
        <Card.Body>
          <Card.Text>Name: {data.todoName}</Card.Text>
          <Card.Text>Description: {data.Description}</Card.Text>
          <Card.Text>
            status: <Dropdown className="d-inline mx-2" onSelect={(value) => (setSelectedOption(value))}>
              <Dropdown.Toggle variant={selectedOption === "Completed" ? "success" : "danger"} id="dropdown-basic">
                {selectedOption}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="Not Completed">Not Completed</Dropdown.Item>
                <Dropdown.Item eventKey="Completed">Completed</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Text>
          <div className='text-end'>
            <Button variant="success" className='btnmargin' onClick={handleShow}>Edit</Button>
            <Button variant="danger" onClick={()=>{onDelete(data)}}>Delete</Button></div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTodoName">
              <Form.Label>Todo Name</Form.Label>
              <Form.Control type="text" name="todoName" value={editedTodo.todoName} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="Description" value={editedTodo.Description} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
}
