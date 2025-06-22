import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Calendar from '../components/calendar/Calendar';
import EventModal from '../components/calendar/EventModal';
import { Plus, CalendarDays } from 'lucide-react';

export default function CalendarPage() {
  const { events, addEvent, deleteEvent } = useApp();
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventClick = (event: typeof events[0]) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleAddEvent = (eventData: Omit<typeof events[0], 'id'>) => {
    addEvent(eventData);
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId);
    setIsModalOpen(false);
  };

  const getEventColor = (type: Event['type']) => {
    // Tüm etkinlikler için mavi arka plan ve siyah yazı
    return 'bg-blue-400 text-black';
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen py-8 bg-gradient-to-b from-blue-100 to-white">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3 mx-auto">
          <CalendarDays className="w-8 h-8 text-blue-700" />
          <h1 className="text-base md:text-lg font-bold font-montserrat text-blue-800 tracking-tight select-none">Takvim</h1>
        </div>
        <button
          onClick={() => {
            setSelectedEvent(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 rounded-lg flex items-center shadow transition-all"
          style={{
            backgroundColor: '#bfdbfe',
            color: '#1e3a8a',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#93c5fd')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#bfdbfe')}
        >
          <Plus className="w-5 h-5 mr-1" style={{ color: '#1e3a8a' }} />
          Yeni Etkinlik
        </button>
      </div>
      <div className="w-full max-w-6xl">
        <Calendar events={events} onEventClick={handleEventClick} />
      </div>
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
        onSave={handleAddEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
}
