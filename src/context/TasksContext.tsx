import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  category?: string;
}

interface TasksContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    setTodos(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title,
        completed: false
      }
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <TasksContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}
