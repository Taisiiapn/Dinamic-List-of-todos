const getTodos = () => fetch('https://jsonplaceholder.typicode.com/todos')
  .then(data => data.json());

const getUsers = () => fetch('https://jsonplaceholder.typicode.com/users')
  .then(data => data.json());

const preparedTodos = async() => {
  const todos = await getTodos();
  const users = await getUsers();

  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId)
  }))
}

export default preparedTodos
