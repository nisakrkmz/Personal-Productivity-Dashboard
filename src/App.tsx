import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Todo from './pages/Todo';
import Grades from './pages/Grades';
import Header from './components/layout/Header';
import SchoolPage from './pages/SchoolPage';
import BlogPages from './pages/BlogPage';
import SchedulePage from './pages/SchedulePage';

function App() {
  return (
    <AppProvider>
      <Router>
        {/* Tüm arka plan açık mavi yapıldı: */}
        <div className="w-screen h-screen bg-blue-100 text-textPrimary flex flex-col">
          <Header />
          {/* main de açık mavi */}
          <main className="flex-1 w-full overflow-y-auto bg-blue-100">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/grades" element={<Grades />} />
              <Route path="/school" element={<SchoolPage />} />
              <Route path="/blog" element={<BlogPages />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
