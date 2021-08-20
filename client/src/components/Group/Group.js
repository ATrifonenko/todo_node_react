import { useState, useEffect } from 'react';
import TodoShort from '../TodoShort/TodoShort';
import Alert from 'react-bootstrap/Alert';

function Group(props) {
  const [groups, setGroups] = useState([]);

  useEffect(() => groupBy(props.groupBy), [props]);

  const groupBy = (groupBy) => {
    const newGroups = [];

    const grouping = (todo, category) => {
      let existingGroups = newGroups.filter((group) => group.category === category);

      if (existingGroups.length > 0) {
        existingGroups[0].todos.push(todo);
      } else {
        let newGroup = {
          category: category,
          todos: [todo],
        };
        newGroups.push(newGroup);
      }
    };

    const groupByDate = () => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const day = 24 * 60 * 60 * 1000;

      for (const todo of props.todos) {
        let date_end = new Date(todo.date_end);
        date_end = new Date(date_end.getFullYear(), date_end.getMonth(), date_end.getDate());

        const category =
          date_end < today
            ? 'Старые и просроченные'
            : date_end.getTime() === today.getTime()
            ? 'Сегодня'
            : date_end.getTime() < today.getTime() + day * 6
            ? 'На неделю'
            : 'Больше недели';
        grouping(todo, category);
      }
    };

    const groupByExecutor = () => {
      for (const todo of props.todos) {
        grouping(todo, todo.executor);
      }
    };

    const groupByUpdatedAt = () => {
      for (const todo of props.todos) {
        grouping(todo, '^ Дата обновления ^');
      }
    };

    if (groupBy === 'date_end') groupByDate();
    if (groupBy === 'executor') groupByExecutor();
    if (groupBy === 'updatedAt') groupByUpdatedAt();

    setGroups(() => [...newGroups]);
  };

  return (
    <>
      {groups.map((group) => {
        return (
          <>
            <Alert className="mt-3" variant="secondary">
              {group.category}
            </Alert>
            {group.todos.map((todo) => (
              <TodoShort
                showFull={props.showFull}
                key={todo.id}
                id={todo.id}
                title={todo.title}
                desc={todo.desc}
                status={todo.status}
                priority={todo.priority}
                date={todo.date_end}
                executor={todo.executor}
              />
            ))}
          </>
        );
      })}
    </>
  );
}

export default Group;
