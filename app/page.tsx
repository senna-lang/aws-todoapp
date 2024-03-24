'use client';

import Todo from './components/Todo';
import { useRef, useState } from 'react';
import { TodoType } from './types';
import { useTodos } from './hooks/useTodos';

export default function Home() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useState<string>('');
  const { todos, listTrigger } = useTodos();

  const data = {
    title: input,
    isCompleted: false,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    listTrigger(data);
    setInput('');
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-32 py-4 px-4">
      <div className="px-4 py-2">
        <h1 className="text-gray-800 font-bold text-2xl uppercase">
          To-Do List
        </h1>
      </div>
      <form
        className="w-full max-w-sm mx-auto px-4 py-2"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent
        border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight
        focus:outline-none"
            type="text"
            placeholder="Add a task"
            onChange={e => setInput(e.target.value)}
          />
          <button
            className="duration-150 flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
      <ul className="divide-y divide-gray-200 px-4">
        {todos?.map((todo: TodoType) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
