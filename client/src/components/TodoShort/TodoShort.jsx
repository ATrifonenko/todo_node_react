import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import './TodoShort.css';

function TodoShort(props) {
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let date_end = new Date(props.date);
    date_end = new Date(date_end.getFullYear(), date_end.getMonth(), date_end.getDate());

    if (today - date_end >= 24 * 60 * 60 * 1000) {
      setExpired(true);
    } else {
      setExpired(false);
    }
  }, [props.date]);

  const date_end = new Date(props.date);

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
    <Card id={props.id} className="m-2 w-100" onClick={() => props.showFull(props.id)}>
      <Card.Header>Статус: {status[props.status]}</Card.Header>
      <Card.Body>
        <Card.Title className={props.status === 'done' ? 'text-success' : expired ? 'text-danger' : ''}>
          {props.title}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Приоритет: {priority[props.priority]}</Card.Subtitle>
        <Card.Text className="pb-2">{props.desc}</Card.Text>
        <Card.Text className="mb-0">Срок: {date_end.toLocaleDateString('ru')}</Card.Text>
        <Card.Text className="mb-0">Ответственный: {props.executor}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TodoShort;
