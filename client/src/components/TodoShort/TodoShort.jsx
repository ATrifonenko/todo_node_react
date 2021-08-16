import Card from 'react-bootstrap/Card';
import './TodoShort.css';

function TodoShort(props) {
  const priority = {
    low: 'Низкий',
    mid: 'Средний',
    high: 'Высокий',
  };
  const status = {
    todo: 'К выполнению',
    inProgress: 'Выполняется',
    done: 'Выполнена',
    canceled: 'Отменена',
  };

  return (
    <Card id={props.id} className="m-2 w-25" onClick={() => props.showFull(props.id)}>
      <Card.Header>Статус: {status[props.status]}</Card.Header>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Приоритет: {priority[props.priority]}</Card.Subtitle>
        <Card.Text className="mb-0">Срок: {props.date}</Card.Text>
        <Card.Text className="mb-0">Ответственный: {props.executor}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TodoShort;
