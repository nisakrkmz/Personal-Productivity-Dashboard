import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'assignment' | 'event';
  description?: string;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  onSave: (event: Omit<Event, 'id'>) => void;
  onDelete: (id: string) => void;
}

export default function EventModal({
  isOpen,
  onClose,
  event,
  onSave,
  onDelete,
}: EventModalProps) {
  const [formData, setFormData] = useState<Omit<Event, 'id'>>({
    title: '',
    date: '',
    type: 'event',
    description: '',
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        date: event.date,
        type: event.type,
        description: event.description || '',
      });
    } else {
      setFormData({
        title: '',
        date: new Date().toISOString().split('T')[0],
        type: 'event',
        description: '',
      });
    }
  }, [event]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-start pt-20 z-50"
      style={{ backgroundColor: 'rgba(191, 219, 254, 0.7)' }}
    >
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {event ? 'Etkinliği Düzenle' : 'Yeni Etkinlik'}
          </h2>
         <button
          onClick={onClose}
          className="p-2 !bg-blue-200 text-black hover:!bg-blue-300 rounded-full transition-colors"
          style={{ backgroundColor: '#bfdbfe' }}
        >
          <X className="w-6 h-6" />
        </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Başlık</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 bg-gray-50 p-3"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Tarih</label>
              <input
                type="date"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 bg-gray-50 p-3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Tür</label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value as Event['type'] })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 bg-gray-50 p-3"
              >
                <option value="exam">Sınav</option>
                <option value="assignment">Ödev</option>
                <option value="event">Etkinlik</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Açıklama (İsteğe Bağlı)</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 bg-gray-50 p-3"
              rows={4}
            />
          </div>

          <div className="flex justify-between items-center pt-4">
            <div>
              {event && (
                <button
                  type="button"
                  onClick={() => onDelete(event.id)}
                  className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  Sil
                </button>
              )}
            </div>
            <button
          type="submit"
          className="px-6 py-3 !bg-blue-200 text-black font-semibold rounded-lg hover:!bg-blue-300 shadow-md hover:shadow-lg transition-all"
          style={{ backgroundColor: '#bfdbfe' }}
        >
          {event ? 'Değişiklikleri Kaydet' : 'Ekle'}
        </button>
          </div>
        </form>
      </div>
    </div>
  );
}
