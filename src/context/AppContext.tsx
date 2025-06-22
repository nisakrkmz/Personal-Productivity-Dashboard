import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { initialTodos, initialGrades, initialEvents } from '../data/mockData';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  category?: string;
}

interface Grade {
  subject: string;
  midterm: number;
  final: number;
  average: number;
}

interface Event {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'assignment' | 'event';
  description?: string;
}

interface AppContextType {
  todos: Todo[];
  grades: Grade[];
  events: Event[];
  addTodo: (todo: Omit<Todo, 'id'>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  addGrade: (grade: Omit<Grade, 'average'>) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  deleteEvent: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [grades, setGrades] = useState<Grade[]>(initialGrades);
  const [events, setEvents] = useState<Event[]>(initialEvents as Event[]);

  const addTodo = (todo: Omit<Todo, 'id'>) => {
    setTodos([...todos, { ...todo, id: crypto.randomUUID() }]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const addGrade = (grade: Omit<Grade, 'average'>) => {
    const average = (grade.midterm + grade.final) / 2;
    setGrades([...grades, { ...grade, average }]);
  };

  const addEvent = (event: Omit<Event, 'id'>) => {
    setEvents([...events, { ...event, id: crypto.randomUUID() }]);
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <AppContext.Provider value={{
      todos,
      grades,
      events,
      addTodo,
      toggleTodo,
      deleteTodo,
      addGrade,
      addEvent,
      deleteEvent,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 