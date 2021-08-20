import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/Container';
import Group from '../Group/Group';
import TodoFull from '../TodoFull/TodoFull';
import api from '../../api';
import { useAuth } from '../../hooks/useAuth';

function Todolist(props) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [idTodo, setIdTodo] = useState(null);
  const [isGetingTodo, setIsGetingTodo] = useState(true);
  const [groupBy, setGroupBy] = useState('updatedAt');

  const { user } = useAuth();

  useEffect(() => {
    fetchTodo();
  }, []);

  const showFull = (id) => {
    setIdTodo(id);
    setIsOpenModal(true);
  };

  const fetchTodo = async () => {
    const todo = await api.todo.getTodo(user.id);
    setTodos([...todo]);
    setIsGetingTodo(false);
  };

  useEffect(() => {}, [todos]);

  const closeFull = () => {
    setIdTodo(null);
    setIsOpenModal(false);
    fetchTodo();
  };

  const group = (groupBy) => {
    const sortedTodos = todos.sort((a, b) => {
      if (groupBy !== 'executor') {
        const dateA = new Date(a[groupBy]);
        const dateB = new Date(b[groupBy]);
        return groupBy === 'date_end' ? dateA - dateB : dateB - dateA;
      }
      return a[groupBy] - b[groupBy];
    });
    setGroupBy(groupBy);
    setTodos([...sortedTodos]);
  };

  return (
    <>
      <Container fluid="md">
        <Navbar>
          <Container className="flex-row bg-light border">
            <Navbar.Brand>Список задач</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>Вы вошли как: {user.name}</Navbar.Text>
              <Button className="ms-3" variant="secondary" size="sm" onClick={props.logoutBtn}>
                Выйти
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
      <Container>
        <Row className="justify-content-between">
          <Col sm>
            <FloatingLabel label="Группировать по:">
              <Form.Select onChange={(e) => group(e.target.value)}>
                <option value="updatedAt">дате обновления</option>
                <option value="date_end">дате завершения</option>
                <option value="executor">ответственным</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col sm>
            <Button className="w-100 h-100" variant="primary" size="lg" onClick={() => showFull()}>
              Создать задачу
            </Button>
          </Col>
        </Row>
      </Container>
      <Container fluid="sm" className="d-flex flex-wrap justify-content-center">
        {isGetingTodo ? (
          <Spinner animation="border" />
        ) : (
          <Group todos={todos} groupBy={groupBy} showFull={showFull}></Group>
          //  ))
        )}
      </Container>
      <TodoFull show={isOpenModal} closeFull={closeFull} id={idTodo} status priority date executor></TodoFull>
    </>
  );
}

export default Todolist;
