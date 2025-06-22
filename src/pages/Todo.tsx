import { useState } from 'react';
import { useApp } from '../context/AppContext';
import TodoList from '../components/todo/TodoList';
import TodoForm from '../components/todo/TodoForm';
import { CheckSquare } from 'lucide-react';

export default function Todo() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useApp();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Pastel açık mavi tonları
  const baseBtnClasses = 'px-3 py-1 rounded-lg font-medium transition-all text-blue-900 !bg-blue-300 hover:!bg-blue-400';
  const activeBtnClasses = 'shadow-lg !bg-blue-400';

  return (
    <div className="flex flex-col items-center w-full min-h-screen py-8 bg-gradient-to-b from-blue-100 to-white">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 mb-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-blue-700" />
            <h1 className="text-base md:text-lg font-bold font-montserrat text-blue-800 tracking-tight select-none">Görevlerim</h1>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`${baseBtnClasses} ${filter === 'all' ? activeBtnClasses : ''}`}
              type="button"
            >
              Tümü
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`${baseBtnClasses} ${filter === 'active' ? activeBtnClasses : ''}`}
              type="button"
            >
              Aktif
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`${baseBtnClasses} ${filter === 'completed' ? activeBtnClasses : ''}`}
              type="button"
            >
              Tamamlanan
            </button>
          </div>
        </div>
        <TodoForm onSubmit={addTodo} />
      </div>
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
        <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
    </div>
  );
}
