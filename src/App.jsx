// src/App.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, TrashIcon, CheckIcon, StarIcon, SparklesIcon } from '@heroicons/react/24/outline';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (title.trim()) {
      setTodos([...todos, { 
        id: Date.now(), 
        title: title, 
        description: description, 
        completed: false 
      }]);
      setTitle('');
      setDescription('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 flex flex-col">
      {/* Header */}
      <header className="p-4 bg-white/10 backdrop-blur-md">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold text-center text-white"
        >
          Web Note
        </motion.h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Floating Icons */}
        <motion.div className="absolute top-10 left-10 text-yellow-300">
          <StarIcon className="w-12 h-12 opacity-30 animate-pulse" />
        </motion.div>
        <motion.div 
          className="absolute bottom-20 right-20 text-pink-300"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <SparklesIcon className="w-10 h-10 opacity-30" />
        </motion.div>
        <motion.div 
          className="absolute top-1/3 left-1/4 text-indigo-300"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <CheckIcon className="w-8 h-8 opacity-20" />
        </motion.div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-lg bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-6 z-10"
        >
          {/* Form */}
          <form onSubmit={addTodo} className="mb-6 space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Todo Title"
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-24"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <PlusIcon className="w-6 h-6" /> Add Task
            </motion.button>
          </form>

          {/* Todo List */}
          <AnimatePresence>
            <ul className="space-y-4 flex flex-col">
              {todos.map(todo => (
                <motion.li
                  key={todo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`p-4 rounded-lg ${
                    todo.completed ? 'bg-gray-100 line-through text-gray-500' : 'bg-indigo-50'
                  }`}
                >
                  <div 
                    onClick={() => toggleTodo(todo.id)}
                    className="cursor-pointer"
                  >
                    <h3 className="font-semibold">{todo.title}</h3>
                    <p className="text-sm">{todo.description}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteTodo(todo.id)}
                    className="mt-2 p-2 text-red-500 hover:text-red-600 float-right"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </AnimatePresence>

          {todos.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 mt-4"
            >
              No tasks yet. Add some above!
            </motion.p>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="p-4 bg-white/10 backdrop-blur-md text-center text-white">
        <p>© 2025 Todo App | Made with ❤️</p>
      </footer>
    </div>
  );
}

export default App;