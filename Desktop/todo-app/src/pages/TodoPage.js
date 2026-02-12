import React, { useState, useEffect } from 'react';
import TodoItem from '../components/TodoItem';

const TodoPage = () => {
  // 1. LocalStorage'dan verileri çekerek başlat (Buzdolabı Mantığı)
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [
      { id: 1, text: "React Projesini Bitir", completed: true },
      { id: 2, text: "GitHub'a Yükle", completed: false },
      { id: 3, text: "Kahve Molası Ver", completed: false },
    ];
  });
  const [input, setInput] = useState("");

  // 2. Her değişiklikte LocalStorage'a kaydet
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 3. GÜNCELLEME (Metin Düzenleme) FONKSİYONU
  const updateTodo = (id) => {
    const todoToEdit = todos.find(t => t.id === id);
    const newText = prompt("Görevi düzenle:", todoToEdit.text);
    if (newText && newText.trim() !== "") {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, text: newText } : todo
      ));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center py-12 px-4">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-indigo-700 tracking-tight">
          Yapılacaklar Listesi
        </h1>
        
        <form onSubmit={addTodo} className="flex mb-8 shadow-sm rounded-lg overflow-hidden">
          <input 
            type="text" 
            className="flex-1 bg-gray-50 border border-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
            placeholder="Yeni bir görev yaz..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="bg-indigo-600 text-white px-6 py-4 font-bold hover:bg-indigo-700 transition duration-300">
            EKLE
          </button>
        </form>

        <div className="space-y-1">
            {todos.length > 0 ? (
              todos.map(todo => (
                <TodoItem 
                  key={todo.id} 
                  todo={todo} 
                  toggleComplete={toggleComplete} 
                  deleteTodo={deleteTodo} 
                  updateTodo={updateTodo} // Bu yeni prop'u ekledik
                />
              ))
            ) : (
              <p className="text-center text-gray-400 mt-6 italic">Listende hiç görev yok!</p>
            )}
        </div>
        
        <div className="mt-6 text-center text-xs text-gray-400">
          Toplam {todos.length} görev
        </div>
      </div>
    </div>
  );
};

export default TodoPage;