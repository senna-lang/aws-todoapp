import React, { useState } from 'react';
import { TodoType } from '../types';
import { useTodos } from '../hooks/useTodos';
import { API_URL } from '../../../constants/url';

type TodoProps = {
  todo: TodoType;
};

async function fetcher(key: string) {
  return fetch(key).then(res => res.json());
}

const Todo = ({ todo }: TodoProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);
  const [isTrueFor5Seconds, setIsTrueFor5Seconds] = useState<boolean>(true);
  const { todos, isLoading, error, mutate } = useTodos();

  const handleEdit = async () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      const response = await fetch(`${API_URL}/editTodos/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editedTitle }),
      });
      if (response.ok) {
        const editedTodos = await response.json();
        const newTodos = todos.map((todo: TodoType) =>
          todo.id === editedTodos.id ? editedTodos : todo
        );
        mutate(newTodos);
        setEditedTitle('');
      }
    }
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`${API_URL}/deleteTodos/${todo.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const deletedTodos = await response.json();
      const newTodos = todos.filter((todo: TodoType) => todo.id !== id);
      mutate(newTodos);
    }
  };

  const toggleTodoCompletion = async (id: number, isCompleted: boolean) => {
    const response = await fetch(`${API_URL}/editTodos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isCompleted: !isCompleted }),
    });
    if (response.ok) {
      const editedTodos = await response.json();
      const newTodos = todos.map((todo: TodoType) =>
        todo.id === editedTodos.id ? editedTodos : todo
      );
      mutate(newTodos);
    }
  };

  return (
    <li className="py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="todo1"
            name="todo1"
            type="checkbox"
            onChange={() => toggleTodoCompletion(todo.id, todo.isCompleted)}
            className="h-4 w-4 text-teal-600 focus:ring-teal-500
                  border-gray-300 rounded"
          />
          <label className="ml-3 block text-gray-900">
            {isEditing ? (
              <input
                type="text"
                className=" border rounded py-1 px-2"
                value={editedTitle}
                onChange={e => setEditedTitle(e.target.value)}
              />
            ) : (
              <span
                className={`text-lg font-medium mr-2 ${
                  todo.isCompleted ? 'line-through' : ''
                }`}
              >
                {' '}
                {todo.title}{' '}
              </span>
            )}
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="duration-150 bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-2 rounded"
            onClick={handleEdit}
          >
            {isEditing ? 'Save' : '✒'}
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded"
            onClick={() => handleDelete(todo.id)}
          >
            ✖
          </button>
        </div>
      </div>
    </li>
  );
};

export default Todo;
