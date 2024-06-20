"use client";

// components/todo-list.tsx

import React, { useState, ChangeEvent, FormEvent } from "react";
import todosData from "../../data/todos";
import Input from "./input";

const Todos: React.FC = () => {
  const [todos, setTodos] = useState(todosData);
  const [newTodo, setNewTodo] = useState("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editTodo, setEditTodo] = useState("");

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const newTodoItem = {
        id: todos.length + 1,
        title: newTodo,
        description: "",
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditTodo(e.target.value);
  };

  const handleEditSave = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: editTodo } : todo
      )
    );
    setIsEditing(null);
    setEditTodo("");
  };

  const handleEditClick = (id: number, currentTitle: string) => {
    setIsEditing(id);
    setEditTodo(currentTitle); // Set editTodo to the current title when editing begins
  };

  return (
    <div className="flex flex-col sm:text-[20px] text-[10px]">
      <Input
        value={newTodo}
        onChange={handleInputChange}
        onAdd={handleAddTodo}
      />
      <ul className="m-5">
        {todos.map((todo) => (
          <li key={todo.id} className="flex flex-row items-center ">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
              className="mx-2"
            />
            {isEditing === todo.id ? (
              <input
                type="text"
                value={editTodo}
                onChange={handleEditChange}
                className="rounded-sm px-4 text-black sm:text-[20px] text-[10px]"
              />
            ) : (
              <h2
                className={`text-[23px] font-bold p-2 mx-2 ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.id} - {todo.title}
              </h2>
            )}
            <button
              onClick={() =>
                isEditing === todo.id
                  ? handleEditSave(todo.id)
                  : handleEditClick(todo.id, todo.title)
              }
              type="button"
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mx-2 sm:text-[20px] text-[10px]"
            >
              {isEditing === todo.id ? "Save" : "Edit"}
            </button>
            <button
              onClick={() => handleDelete(todo.id)}
              type="button"
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mx-1 sm:text-[20px] text-[10px]"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
