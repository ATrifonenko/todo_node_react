import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { useAuth } from '../../hooks/useAuth';
import api from '../../api';

function TodoFull(props) {
  const { user } = useAuth();

  const initData = {
    title: '',
    desc: '',
    priority: 'mid',
    status: 'todo',
    date_end: '',
    executor: user.id,
    creator: '',
  };

  const [data, setData] = useState(initData);

  const [disabledField, setDisabledField] = useState(false);

  useEffect(() => {
    if (props.id) {
      const fetchTodo = async () => {
        const todo = await api.todo.getTodoById(props.id);
        if (todo.creator !== user.id) {
          setDisabledField(true);
        }
        setData({ ...todo });
      };
      fetchTodo();
    } else {
      setData((prevData) => ({ ...initData, creator: user.id }));
    }
  }, [props.id]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const closeModal = (s) => {
    setDisabledField(false);
    props.closeFull(s);
  };

  const handleChange = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (props.id) {
      api.todo.update(data).then(() => closeModal('withUpdate'));
    } else {
      api.todo.add(data).then(() => closeModal('withAdd'));
    }
  };

  return (
    <Modal show={props.show} onHide={closeModal} size="lg">
      <Modal.Body>
        <Form onSubmit={onFormSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Control
              required
              readOnly={disabledField}
              placeholder="Заголовок"
              value={data.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="desc">
            <Form.Control
              readOnly={disabledField}
              as="textarea"
              placeholder="Описание задачи"
              value={data.desc}
              onChange={handleChange}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="priority">
              <Form.Label>Приоритет</Form.Label>
              <Form.Select disabled={disabledField} value={data.priority} onChange={handleChange}>
                <option value="low">Низкий</option>
                <option value="mid">Средний</option>
                <option value="high">Высокий</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="status">
              <Form.Label>Статус</Form.Label>
              <Form.Select value={data.status} onChange={handleChange}>
                <option value="todo">К выполнению</option>
                <option value="inProgress">Выполняется</option>
                <option value="done">Выполнена</option>
                <option value="canceled">Отменена</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="date_end">
              <Form.Label>Сроки</Form.Label>
              <Form.Control
                required
                readOnly={disabledField}
                type="date"
                value={data.date_end}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="executor">
            <Form.Label>Ответственный</Form.Label>
            <Form.Select disabled={disabledField} value={data.executor} onChange={handleChange}>
              {props.myEmployee
                ? props.myEmployee.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))
                : ''}
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Сохранить
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default TodoFull;
