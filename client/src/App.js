import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { FiSun, FiMoon, FiTrash2, FiPlus } from "react-icons/fi";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const fetchTodos = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/api/todos`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTodos(data);
      setLoading(false);
    } catch (err) {
      setError(`Failed to fetch todos: ${err.message}`);
      setLoading(false);
      console.error("Fetch error:", err);
    }
  }, [API_BASE]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      const response = await fetch(`${API_BASE}/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: newTodo,
          completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add todo: ${response.status}`);
      }

      const result = await response.json();
      setTodos([...todos, result.todo]);
      setNewTodo("");
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/todos/${id}`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error(`Failed to update todo: ${response.status}`);
      }

      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete todo: ${response.status}`);
      }

      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="container">
        <header>
          <h1>Todo App</h1>
          <button onClick={toggleDarkMode} className="theme-toggle">
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </header>

        <div className="todo-form">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new todo..."
            className="todo-input"
          />
          <button onClick={addTodo} className="add-button">
            <FiPlus size={20} />
          </button>
        </div>

        <div className="todo-list">
          {todos.length === 0 ? (
            <p className="empty-state">No todos yet. Add one above!</p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo._id}
                className={`todo-item ${todo.completed ? "completed" : ""}`}
              >
                <div className="todo-content">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo._id)}
                    className="todo-checkbox"
                  />
                  <span className="todo-text">{todo.body}</span>
                </div>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="delete-button"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
