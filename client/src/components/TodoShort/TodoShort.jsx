import Card from 'react-bootstrap/Card';
import './TodoShort.css';

function TodoShort({ id, ...props }) {
  return (
    <Card id={props.id} className="m-2 w-25" onClick={() => props.showFull(id)}>
      <Card.Header>Статус: {props.status}</Card.Header>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Приоритет: {props.priority}</Card.Subtitle>
        <Card.Text className="mb-0">Срок: {props.date}</Card.Text>
        <Card.Text className="mb-0">Ответственный: {props.executor}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TodoShort;
