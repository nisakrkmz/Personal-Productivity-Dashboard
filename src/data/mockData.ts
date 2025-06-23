export const initialTodos = [
  {
    id: '1',
    title: 'Matematik ödevini tamamla',
    completed: false,
    category: 'Ödev',
  },
  {
    id: '2',
    title: 'Fizik projesini hazırla',
    completed: true,
    category: 'Proje',
  },
  {
    id: '3',
    title: 'İngilizce sunumu hazırla',
    completed: false,
    category: 'Sunum',
  },
];

export const initialGrades = [
  {
    id: '1',
    subject: 'Matematik',
    midterm: 75,
    final: 85,
    average: 80,
  },
  {
    id: '2',
    subject: 'Fizik',
    midterm: 65,
    final: 70,
    average: 67.5,
  },
  {
    id: '3',
    subject: 'İngilizce',
    midterm: 90,
    final: 95,
    average: 92.5,
  },
];

export const initialEvents = [
  {
    id: '1',
    title: 'Matematik Final Sınavı',
    date: '2024-06-15',
    type: 'exam' as const,
    description: 'Tüm konular dahil',
  },
  {
    id: '2',
    title: 'Fizik Proje Teslimi',
    date: '2024-05-20',
    type: 'assignment' as const,
    description: 'Deney raporu teslimi',
  },
  {
    id: '3',
    title: 'İngilizce Sunum',
    date: '2024-05-10',
    type: 'event' as const,
    description: 'Final projesi sunumu',
  },
]; 