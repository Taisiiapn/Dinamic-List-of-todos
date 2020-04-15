import React from 'react';
import PropTypes from 'prop-types';

const ListOfTodos = ({ todos, sortBy }) => (
  <table>
    <thead>
      <tr className="table__title">
        <th><button onClick={() => sortBy('id')} className="table__title-btn">
          Todo ID
        </button></th>
        <th><button onClick={() => sortBy('name')} className="table__title-btn">
          User name
        </button></th>
        <th><button onClick={() => sortBy('title')} className="table__title-btn">
          Todos
        </button></th>
        <th><button onClick={() => sortBy('completed')} className="table__title-btn">
          Completed
        </button></th>
      </tr>
    </thead>

    <tbody>
      {todos.map(todo =>
        <tr key={todo.id}>
          <td>{todo.id}</td>
          <td>{todo.user.name}</td>
          <td>{todo.title}</td>
          <td>{todo.completed ? 'completed' : 'uncompleted'}</td>
        </tr>
      )}
  </tbody>
</table>
)

ListOfTodos.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortBy: PropTypes.func
}

export default ListOfTodos;
