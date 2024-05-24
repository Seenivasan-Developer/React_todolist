import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { Todoadd } from './Components/Todoadd';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for unique IDs

function App() {
  const [todoName, settodoName]=useState("");
  const [todoDesc, settodoDesc]=useState("");
const [tododata, settododata] =useState([
  {
    id: uuidv4(),
    todoName: "My Task -1",
    Description: "This is the description of my first task",
    status:"Not Completed",
  },
  {
    id: uuidv4(),
    todoName: "My Task -2",
    Description: "This is the description of my second task",
    status:"Completed",
  },
  {
    id: uuidv4(),
    todoName: "My Task -3",
    Description: "This is the description of my third task",
    status:"Not Completed",
  }
])

const [filter, setFilter]=useState("All");

const handleDelete = (id) => {
  const updatedTodos = tododata.filter(todo => todo.id !== id);
  settododata(updatedTodos);
};

const handleEdit = (editedTodo) => {
  const updatedTodos = tododata.map(todo => todo.id === editedTodo.id ? editedTodo : todo);
  settododata(updatedTodos);
};
const filteredTodos = tododata.filter(todo => {
  if (filter === "All") return true;
  if (filter === "Completed") return todo.status === "Completed";
  if (filter === "Not Completed") return todo.status === "Not Completed";
  return true;
});

  return (
    <Container>
      <Row md={4}  className="justify-content-md-center rowpad">
        <Col><div className="heading" style={{textAlign:'center'}}><h2>My Todo</h2></div></Col>
      </Row>
      <Row md={4}  className="justify-content-md-center rowpad">
        <Col>
          <input type="text" value={todoName} placeholder='Todo Name' className="form-control border border-success-subtle" onChange={(e)=> settodoName(e.target.value)}/>
        </Col>
        <Col>
        <input type="text" value={todoDesc} placeholder='Description' className="form-control border border-success-subtle" onChange={(e)=> settodoDesc(e.target.value)} />
        </Col>
        <Col>
        <Button variant="success" type="button" onClick={()=>{
          if(todoName!=="" && todoDesc !==""){
          const newdata={
            id: uuidv4(),
            todoName: todoName,
    Description: todoDesc,
    status:"Not Completed",
          }
          settododata([...tododata,newdata]);
          settodoDesc("");
          settodoName("");
        }
        else{
          alert("Enter Valid data...");
        }
        }}>
        Submit
      </Button>
      </Col>
      </Row>
       <Row className="justify-content-md-center rowpad">
        <Col>
        <div className='mytodos'>
        <span><h6 className="d-inline">My Todos</h6></span>
        <div>
        <span><h6 className="d-inline">Status Filter:</h6></span>
          <Dropdown className="d-inline mx-2" style={{textAlign:'right'}}>
            <Dropdown.Toggle variant="danger" id="dropdown-basic">
              {filter}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setFilter("All")}>All</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter("Completed")}>Completed</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter("Not Completed")}>Not Completed</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>
          </div>
        </Col>
      </Row>
      <Row className='rowpad'>
        {filteredTodos.map(td => (
          <Todoadd data={td} key={td.id} onDelete={() => handleDelete(td.id)} onEdit={handleEdit} />
        ))}
      </Row>
    </Container>
  );
}


export default App;
