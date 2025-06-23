interface Grade {
  id: string;
  subject: string;
  midterm: number;
  final: number;
  average: number;
}

interface GradeTableProps {
  grades: Grade[];
  onEdit?: (grade: Grade) => void;
  onDelete?: (id: string) => void;
}

export default function GradeTable({ grades, onEdit, onDelete }: GradeTableProps) {
  if (grades.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        Henüz not girilmemiş.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ders</th>
            <th className="px-6 py-3">Vize</th>
            <th className="px-6 py-3">Final</th>
            <th className="px-6 py-3">Ortalama</th>
            <th className="px-6 py-3">Durum</th>
            <th className="px-6 py-3">İşlemler</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {grades.map((grade) => (
            <tr key={grade.id} className="hover:bg-gray-50 text-center">
              <td className="px-6 py-4 text-sm font-medium text-gray-900 text-left">{grade.subject}</td>
              <td>{grade.midterm}</td>
              <td>{grade.final}</td>
              <td>{grade.average.toFixed(2)}</td>
              <td>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    grade.average >= 60 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {grade.average >= 60 ? 'Başarılı' : 'Başarısız'}
                </span>
              </td>
              <td>
                <button
                  onClick={() => onEdit?.(grade)}
                  style={{ backgroundColor: '#2563eb', color: 'white', borderRadius: '0.375rem', padding: '0.25rem 0.5rem', marginRight: '0.5rem', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2563eb')}
                >
                  Düzenle
                </button>
                <button
                  onClick={() => onDelete?.(grade.id)}
                  style={{ backgroundColor: '#1e40af', color: 'white', borderRadius: '0.375rem', padding: '0.25rem 0.5rem', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#172554')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1e40af')}
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
