import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import TodoShort from '../TodoShort/TodoShort';
import TodoFull from '../TodoFull/TodoFull';
import api from '../../api';

function Todolist(props) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [idTodo, setIdTodo] = useState(null);
  const [isGetingTodo, setIsGetingTodo] = useState(true);

  const showFull = (id) => {
    console.log(id);
    setIdTodo(id);
    setIsOpenModal(true);
  };

  useEffect(() => {
    const fetchTodo = async () => {
      const todo = await api.todo.getTodo();
      setTodos(todo);
      setIsGetingTodo(false);
    };
    fetchTodo();
  }, []);

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
        {isGetingTodo ? (
          <Spinner animation="border" />
        ) : (
          todos.map((todo) => (
            <TodoShort
              showFull={showFull}
              key={todo.id}
              id={todo.id}
              title={todo.title}
              status={todo.status}
              priority={todo.priority}
              date={todo.date_end}
              executor={todo.executor}
            />
          ))
        )}
      </Container>
      <TodoFull show={isOpenModal} closeFull={closeFull} id={idTodo} status priority date executor></TodoFull>
    </>
  );
}

export default Todolist;
