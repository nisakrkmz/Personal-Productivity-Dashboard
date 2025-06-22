import { Sun } from 'lucide-react';

export default function WelcomeCard() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Günaydın' : currentHour < 18 ? 'İyi Günler' : 'İyi Akşamlar';

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
      <div className="flex items-center space-x-4">
        <Sun className="w-12 h-12" />
        <div>
          <h2 className="text-2xl font-bold">{greeting}, Nisa!</h2>
          <p className="text-blue-100">
            Programlı ve düzenli olmak için çabala. Başarılar!
          </p>
        </div>
      </div>
    </div>
  );
} 

