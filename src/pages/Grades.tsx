import { useState } from 'react';
import { useApp } from '../context/AppContext';
import GradeTable from '../components/grades/GradeTable';
import GradeForm from '../components/grades/GradeForm';
import { Plus, BookOpen } from 'lucide-react';

export default function GradesPage() {
  const { grades, addGrade } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const averageGrade = grades.length > 0
    ? grades.reduce((sum, grade) => sum + grade.average, 0) / grades.length
    : 0;

  return (
    <div className="flex flex-col items-center w-full min-h-screen py-8 bg-gradient-to-b from-blue-100 to-white">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto">
          <BookOpen className="w-6 h-6 text-blue-700" />
          <h1 className="text-base md:text-lg font-bold font-montserrat text-blue-800 tracking-tight select-none">Notlarım</h1>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 rounded-lg flex items-center shadow transition-all font-semibold"
          style={{
            backgroundColor: '#bfdbfe',
            color: '#1e3a8a',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#93c5fd')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#bfdbfe')}
        >
          <Plus className="w-5 h-5 mr-1" style={{ color: '#1e3a8a' }} />
          Yeni Not Ekle
        </button>
      </div>
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
        <GradeTable grades={grades} />
      </div>
      {isFormOpen && (
        <GradeForm
          onSubmit={addGrade}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
