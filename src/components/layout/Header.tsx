import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Calendar,
  CheckSquare,
  BookOpen,
  NotebookPen,
  GraduationCap,
  LogOut,
} from 'lucide-react';

export default function Header() {
  const location = useLocation();

  const currentDate = new Date().toLocaleDateString('tr-TR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.reload();
  };

  const navItems = [
    { path: '/dashboard', label: 'Ana Sayfa', icon: Home },
    { path: '/calendar', label: 'Takvim', icon: Calendar },
    { path: '/todo', label: 'Görevler', icon: CheckSquare },
    { path: '/grades', label: 'Notlar', icon: BookOpen },
    { path: '/school', label: 'Okul', icon: GraduationCap },
    { path: '/blog', label: 'Blog', icon: NotebookPen },
    { path: '/schedule', label: 'Program', icon: Calendar },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-blue-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-4">

        {/* Sol: Hoş geldin + Tarih */}
        <div className="flex flex-col gap-4 pt-1">
          <h1 className="text-lg font-semibold leading-tight">Hoş geldin, Nisa!</h1>
          <p className="text-sm opacity-75">{currentDate}</p>
        </div>

        {/* Orta: Navigasyon */}
        <nav className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition duration-200 text-sm font-medium ${
                isActive(path)
                  ? 'bg-white text-blue-700 shadow'
                  : 'hover:bg-blue-700 text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </nav>

      </div>
    </header>
  );
}

