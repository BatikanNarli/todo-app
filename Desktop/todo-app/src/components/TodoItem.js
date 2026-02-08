import React from 'react';

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <div className={`flex justify-between items-center p-4 mb-3 bg-white shadow-md rounded-lg border-l-4 ${todo.completed ? 'border-green-500 opacity-75' : 'border-indigo-500'}`}>
      <div className="flex items-center cursor-pointer flex-1" onClick={() => toggleComplete(todo.id)}>
         <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
            {todo.completed && <span className="text-white text-xs">✓</span>}
         </div>
         <span className={`text-lg font-medium transition-all ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
           {todo.text}
         </span>
      </div>
      <button 
        onClick={() => deleteTodo(todo.id)} 
        className="ml-4 text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition"
        title="Sil"
      >
        🗑️
      </button>
    </div>
  );
};

export default TodoItem;