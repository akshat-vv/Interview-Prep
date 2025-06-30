import React, { useState, useEffect } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Load from localStorage
  useEffect(() => {
    const data = localStorage.getItem('todos');
    if (data) {
      try {
        setTodos(JSON.parse(data));
      } catch (err) {
        console.error("Invalid JSON in localStorage");
        setTodos([]);
      }
    }
  }, []);

  // Save to localStorage on todos update
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: input,
      done: false,
    };
    setTodos([newTodo, ...todos]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const sortedTodos = [
    ...todos.filter(t => !t.done),
    ...todos.filter(t => t.done),
  ];

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Todo List</h2>
      <div style={{ display: 'flex', gap: 10 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="Add a todo..."
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
        {sortedTodos.map(todo => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{
              background: '#f0f0f0',
              marginBottom: '8px',
              padding: '10px',
              borderRadius: '4px',
              textDecoration: todo.done ? 'line-through' : 'none',
              display: 'flex',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            {todo.text}
            <span
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(todo.id);
              }}
              style={{ color: 'red', marginLeft: '10px' }}
            >
              ✖
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
