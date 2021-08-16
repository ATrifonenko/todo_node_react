import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import TodoShort from '../TodoShort/TodoShort';
import './Todolist.css';
import TodoFull from '../TodoFull/TodoFull';

function Todolist(props) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [idTodo, setIdTodo] = useState(null);

  const showFull = (id) => {
    setIdTodo(id);
    setIsOpenModal(true);
  };

  const closeFull = () => setIsOpenModal(false);

  return (
    <>
      <Container fluid="md">
        <Navbar>
          <Container className="flex-row bg-light border">
            <Navbar.Brand>Список задач</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>Вы вошли как: Трифоненко Андрей Сергеевич</Navbar.Text>
              <Button className="ms-3" variant="secondary" size="sm" onClick={props.logoutBtn}>
                Выйти
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
      <Container fluid="sm" className="d-flex flex-wrap justify-content-center">
        <TodoShort showFull={showFull} id={2}></TodoShort>
      </Container>
      <TodoFull show={isOpenModal} closeFull={closeFull} id={idTodo} status priority date executor></TodoFull>
    </>
  );
}

export default Todolist;
