import TodoShort from '../TodoShort/TodoShort';
import Alert from 'react-bootstrap/Alert';

function Group(props) {
  const { id, title, desc, status, priority, date_end, executor } = props.todo;

  // const today = Date.now();
  // const day = 24 * 60 * 60 * 1000;
  // const date_end_todo = new Date(date_end);
  // const date_end_prevtodo = new Date(props.prevTodo?.date_end);

  // const isNewDateSeparator =
  //   today + day > date_end_todo.valueOf()
  //     ? 'Сегодня и просроченные'
  //     : // : date_end_todo - date_end_prevtodo > day && today + day
  //       // ? 'На ближайшую неделю'
  //       false;

  const isNewExecutor = executor !== props.prevTodo?.executor || props.index === 0;

  return (
    <>
      {isNewExecutor && props.groupBy === 'executor' ? (
        <Alert className="mt-3" variant="secondary">
          {executor}
        </Alert>
      ) : null}
      {/* {isNewDateSeparator && props.groupBy === 'date_end' ? (
        <Alert className="mt-3" variant="secondary">
          {isNewDateSeparator}
        </Alert>
      ) : null} */}
      <TodoShort
        showFull={props.showFull}
        key={id}
        id={id}
        title={title}
        desc={desc}
        status={status}
        priority={priority}
        date={date_end}
        executor={executor}
      />
    </>
  );
}

export default Group;
