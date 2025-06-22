interface Grade {
  subject: string;
  midterm: number;
  final: number;
  average: number;
}

interface GradeTableProps {
  grades: Grade[];
}

export default function GradeTable({ grades }: GradeTableProps) {
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ders
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vize
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Final
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ortalama
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Durum
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {grades.map((grade, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {grade.subject}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {grade.midterm}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {grade.final}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {grade.average.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    grade.average >= 60
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {grade.average >= 60 ? 'Başarılı' : 'Başarısız'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 