const sortTodos = (todos) => {
  const newTodos = {};

  todos.map((todo) => {
    if (newTodos[todo.status]) newTodos[todo.status] = [];
    newTodos[todo.status].push(todo);
  });

  return newTodos;
};

export default sortTodos;
