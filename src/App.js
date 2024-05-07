import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Todoadd } from './Components/Todoadd';

function App() {
  const [todoName, settodoName]=useState("");
  const [todoDesc, settodoDesc]=useState("");
const [tododata, settododata] =useState([
  {
    todoName: "My Task -1",
    Description: "This is the description of my first task",
    status:"Not Completed",
  },
  {
    todoName: "My Task -2",
    Description: "This is the description of my second task",
    status:"Completed",
  },
  {
    todoName: "My Task -3",
    Description: "This is the description of my third task",
    status:"Not Completed",
  }
])


const handleDelete = (todoToDelete) => {
  const updatedTodos = tododata.filter(todo => todo !== todoToDelete);
  settododata(updatedTodos);
};


// const handleEdit = (todoToEdit) => {
//   // Add your edit functionality here
//   console.log("Editing todo:", todoToEdit);
// };


  return (
    <Container>
      <Row md={4}  className="justify-content-md-center rowpad">
        <Col><div className="heading">My Todo</div></Col>
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
          const newdata={
            todoName: todoName,
    Description: todoDesc,
    status:"Not Completed",
          }
          settododata([...tododata,newdata]);
          settodoDesc("");
          settodoName("");
        }}>
        Submit
      </Button>
      </Col>
      </Row>
      <Row></Row>
      <Row className='rowpad'>
        
    {tododata.map((td, index)=> { 
      return <Todoadd data={td} key={index} onDelete={handleDelete} />
     })}
     </Row>
    </Container>
  );
}


export default App;
