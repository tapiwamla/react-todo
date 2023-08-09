// Import React and the required styles.
import React from "react";
import "./App.css";

// Define the main App component.
const App = () => {
  // State variables to manage the todo list and its interactions.
  const [todos, setTodos] = React.useState([]); // Array of todos
  const [todo, setTodo] = React.useState("");   // Current todo input
  const [statusFilter, setStatusFilter] = React.useState("All"); // Filter status for todos

  // Load todos from local storage when component mounts.
  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  // Update local storage when todos change.
  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  // Function to handle adding a new todo.
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

  // Function to delete a todo by ID.
  function deleteTodo(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  // Function to toggle the completion status of a todo.
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

  // Filter todos based on the selected status.
  const filteredTodos = todos.filter((todo) => {
    if (statusFilter === "All") return true;
    if (statusFilter === "Completed") return todo.completed;
    if (statusFilter === "Uncompleted") return !todo.completed;
    return true;
  });

  // Render the UI.
  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      {/* Form to input new todos */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Add Todo</button>
      </form>
      {/* Filter buttons */}
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
      {/* Display filtered todos */}
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

// Export the App component as the default export.
export default App;

