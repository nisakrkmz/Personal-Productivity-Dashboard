import { useApp } from '../../context/AppContext';
import { CheckCircle2, Circle } from 'lucide-react';

export default function TaskList() {
  const { todos, toggleTodo } = useApp();

  const todayTasks = todos.filter(todo => !todo.completed);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Bugünün Görevleri</h3>
      {todayTasks.length === 0 ? (
        <p className="text-gray-500">Bugün için görev bulunmuyor.</p>
      ) : (
        <ul className="space-y-3">
          {todayTasks.map(todo => (
            <li
              key={todo.id}
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className="px-3 py-1 rounded-lg font-medium transition-all shadow"
                style={{
                  backgroundColor: '#bfdbfe', // bg-blue-300 pastel
                  color: '#1e3a8a', // text-blue-900 koyu mavi
                }}
              >
                {todo.completed ? (
                  <CheckCircle2
                    className="w-5 h-5"
                    stroke="#1e3a8a"
                    fill="#1e3a8a"
                  />
                ) : (
                  <Circle
                    className="w-5 h-5"
                    stroke="#1e3a8a"
                    fill="none"
                  />
                )}
              </button>
              <span className={todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}>
                {todo.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
