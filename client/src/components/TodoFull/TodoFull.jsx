import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import api from '../../api';

function TodoFull(props) {
  const [data, setData] = useState({
    title: '',
    desc: '',
    priority: 'mid',
    status: 'todo',
    date: '',
    executor: '',
  });

  const closeModal = () => {
    setData({
      title: '',
      desc: '',
      priority: 'mid',
      status: 'todo',
      date: '',
      executor: '',
    });
    props.closeFull();
  };

  const handleChange = (e) => setData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));

  const onFormSubmit = (e) => {
    e.preventDefault();
    api.todo.add(data).then(() => closeModal());
    console.log(data);
  };

  return (
    <Modal show={props.show} onHide={closeModal} size="lg">
      <Modal.Body>
        <Form onSubmit={onFormSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Control placeholder="Заголовок" value={data.title} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="desc">
            <Form.Control as="textarea" placeholder="Описание задачи" value={data.desc} onChange={handleChange} />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="priority">
              <Form.Label>Приоритет</Form.Label>
              <Form.Select value={data.priority} onChange={handleChange}>
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

            <Form.Group as={Col} controlId="date">
              <Form.Label>Сроки</Form.Label>
              <Form.Control type="date" value={data.value} onChange={handleChange} />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="executor">
            <Form.Label>Ответственный</Form.Label>
            <Form.Select value={data.executor} onChange={handleChange}>
              <option>Создатель задачи</option>
              <option>Пупкин</option>
              <option>Сидорович</option>
              <option>СанСаныч</option>
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
