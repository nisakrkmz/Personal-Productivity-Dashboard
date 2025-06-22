import { useApp } from '../../context/AppContext';
import { Calendar } from 'lucide-react';

export default function UpcomingExams() {
  const { events } = useApp();
  const today = new Date();
  
  const upcomingExams = events
    .filter(event => event.type === 'exam' && new Date(event.date) > today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Yaklaşan Sınavlar</h3>
      {upcomingExams.length === 0 ? (
        <p className="text-gray-500">Yaklaşan sınav bulunmuyor.</p>
      ) : (
        <div className="space-y-4">
          {upcomingExams.map(exam => (
            <div
              key={exam.id}
              className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
            >
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <h4 className="font-medium text-gray-900">{exam.title}</h4>
                <p className="text-sm text-gray-500">
                  {new Date(exam.date).toLocaleDateString('tr-TR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 