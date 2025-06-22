import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'assignment' | 'event';
  description?: string;
}

interface CalendarProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

export default function Calendar({ events, onEventClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  const dayNames = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getEventsForDay = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    });
  };

  const getEventColor = (type: Event['type']) => {
    // Tüm etkinlikler için mavi renk
    return 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg w-full overflow-hidden border border-gray-200">
      <div className="p-4 flex items-center justify-between border-b">
        <button
          onClick={prevMonth}
          className="p-2 rounded-full transition-all shadow"
          style={{ backgroundColor: '#bfdbfe', color: '#1e3a8a' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#93c5fd')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#bfdbfe')}
          title="Önceki Ay"
        >
          <ChevronLeft className="w-6 h-6" stroke="#1e3a8a" />
        </button>
        <h2 className="text-2xl font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 rounded-full transition-all shadow"
          style={{ backgroundColor: '#bfdbfe', color: '#1e3a8a' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#93c5fd')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#bfdbfe')}
          title="Sonraki Ay"
        >
          <ChevronRight className="w-6 h-6" stroke="#1e3a8a" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200 w-full">
        {dayNames.map(day => (
          <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}

        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="bg-white p-2" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const dayEvents = getEventsForDay(day);
          
          return (
            <div
              key={day}
              className="bg-white p-2 min-h-[100px] hover:bg-gray-50"
            >
              <span className="text-sm text-gray-500">{day}</span>
              <div className="mt-1 space-y-1">
                {dayEvents.map(event => (
                  <button
  key={event.id}
  onClick={() => onEventClick(event)}
  className="w-full text-left text-xs px-2 py-1 rounded text-black"
  style={{ backgroundColor: '#60A5FA', color: '#000000' }}
>
  {event.title}
</button>


                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 