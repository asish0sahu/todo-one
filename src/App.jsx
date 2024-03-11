import React, { useState } from "react";
import "./App.css";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [taskCount, setTaskCount] = useState(0);

  const handleAddTask = (taskName, quantity) => {
    const newTasks = Array.from({ length: quantity }, (_, index) => ({
      id: taskCount + index + 1,
      name: taskName,
    }));
    setTasks((prevTasks) => [...prevTasks, ...newTasks]);
    setTaskCount((prevCount) => prevCount + quantity);
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleUpdateTask = (id, newName) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, name: newName } : task
      )
    );
  };

  return (
    <div className="todo-app">
      <h1>Daily Goals</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onUpdateTask={handleUpdateTask}
      />
    </div>
  );
}

function TaskForm({ onAddTask }) {
  const [taskName, setTaskName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!taskName.trim()) return;
    onAddTask(taskName, quantity);
    setTaskName("");
    setQuantity(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

function TaskList({ tasks, onDeleteTask, onUpdateTask }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");

  const handleEditTask = (id, name) => {
    setEditingTaskId(id);
    setEditedTaskName(name);
  };

  const handleSaveTask = (id) => {
    onUpdateTask(id, editedTaskName);
    setEditingTaskId(null);
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {editingTaskId === task.id ? (
            <>
              <input
                type="text"
                value={editedTaskName}
                onChange={(e) => setEditedTaskName(e.target.value)}
              />
              <button onClick={() => handleSaveTask(task.id)}>Save</button>
            </>
          ) : (
            <>
              {task.name}
              <button onClick={() => onDeleteTask(task.id)}>Delete</button>
              <button onClick={() => handleEditTask(task.id, task.name)}>
                Edit
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <div className="App">
      <TodoApp />
    </div>
  );
}

export default App;

