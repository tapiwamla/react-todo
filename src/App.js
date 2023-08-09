import React from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("All");

  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodo("");
  }

  function deleteTodo(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  const filteredTodos = todos.filter((todo) => {
    if (statusFilter === "All") return true;
    if (statusFilter === "Completed") return todo.completed;
    if (statusFilter === "Uncompleted") return !todo.completed;
    return true;
  });

  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Add Todo</button>
      </form>
      <div id="status-indicators">
        <button
          className="status-indicator-single"
          onClick={() => setStatusFilter("All")}
        >
          All
        </button>
        <button
          className="status-indicator-single"
          onClick={() => setStatusFilter("Completed")}
        >
          Completed
        </button>
        <button
          className="status-indicator-single"
          onClick={() => setStatusFilter("Uncompleted")}
        >
          Uncompleted
        </button>
      </div>
      {filteredTodos.length === 0 ? (
        <p>{todos.length === 0 ? "No tasks yet." : "All tasks completed."}</p>
      ) : (
        filteredTodos.map((todo) => (
          <div key={todo.id} className="todo">
            <div className="todo-text">
              <input
                type="checkbox"
                id="completed"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              <div>{todo.text}</div>
            </div>
            <div className="todo-actions">
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default App;
