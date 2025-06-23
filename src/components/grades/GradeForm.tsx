import { useState } from 'react';
import { X } from 'lucide-react';

interface Grade {
  subject: string;
  midterm: number;
  final: number;
  average: number;
}

interface GradeFormProps {
  onSubmit: (grade: Grade) => void;
  onClose: () => void;
  initialData?: Grade;
}

export default function GradeForm({ onSubmit, onClose, initialData }: GradeFormProps) {
  const [formData, setFormData] = useState<Grade>(
    initialData || { subject: '', midterm: 0, final: 0, average: 0 }
  );

  const calculateAverage = (midterm: number, final: number) =>
    midterm * 0.4 + final * 0.6;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const average = calculateAverage(formData.midterm, formData.final);
    onSubmit({ ...formData, average });
    onClose();
  };

  const average = calculateAverage(formData.midterm, formData.final);
  const isPassing = average >= 60;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(191, 219, 254, 0.6)' }}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {initialData ? 'Notu Düzenle' : 'Yeni Not Ekle'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 bg-blue-200 text-black hover:bg-blue-300 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Ders Adı</label>
            <input
              type="text"
              value={formData.subject}
              onChange={e => setFormData({ ...formData, subject: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 bg-gray-50 p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Vize Notu (%40)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.midterm}
              onChange={e => setFormData({ ...formData, midterm: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 bg-gray-50 p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Final Notu (%60)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.final}
              onChange={e => setFormData({ ...formData, final: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 bg-gray-50 p-2"
              required
            />
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Ortalama:</span>
              <span className="text-lg font-semibold">{average.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm font-medium text-gray-700">Durum:</span>
              <span className={`text-sm font-medium ${isPassing ? 'text-green-600' : 'text-red-600'}`}>
                {isPassing ? 'Geçti' : 'Kaldı'}
              </span>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-blue-200 text-black hover:bg-blue-300 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-200 text-black hover:bg-blue-300 transition-colors font-semibold"
            >
              {initialData ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
