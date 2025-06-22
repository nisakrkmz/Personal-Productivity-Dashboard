import { CheckCircle2, Circle, Trash2 } from 'lucide-react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  category?: string;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        Henüz görev eklenmemiş.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow divide-y">
      {todos.map(todo => (
        <div
          key={todo.id}
          className="p-4 flex items-center justify-between hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onToggle(todo.id)}
              className="rounded-full p-2 transition-all shadow"
              style={{
                backgroundColor: '#bfdbfe', // pastel mavi
                color: '#1e3a8a', // koyu mavi
              }}
              title="Tamamla/Tamamlanmadı olarak işaretle"
            >
              {todo.completed ? (
                <CheckCircle2 className="w-5 h-5" stroke="#1e3a8a" fill="#1e3a8a" />
              ) : (
                <Circle className="w-5 h-5" stroke="#1e3a8a" fill="none" />
              )}
            </button>
            <div>
              <span
                className={`${
                  todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
                }`}
              >
                {todo.title}
              </span>
              {todo.category && (
                <span className="ml-2 text-sm text-gray-500">
                  ({todo.category})
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => onDelete(todo.id)}
            className="rounded-full p-2 transition-all shadow hover:bg-blue-400"
            style={{
              backgroundColor: '#bfdbfe',
              color: '#1e3a8a',
            }}
            title="Görevi Sil"
          >
            <Trash2 className="w-5 h-5" stroke="#1e3a8a" fill="none" />
          </button>
        </div>
      ))}
    </div>
  );
} 