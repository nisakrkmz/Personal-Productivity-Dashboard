import { CalendarDays } from 'lucide-react';

export default function SchedulePage() {
  const schedule = [
    {
      day: "Pazartesi",
      lessons: [
        { time: "08:30", title: "Veri Yapıları ve Algoritmalar" },
        { time: "10:30", title: "Akademik İngilizce" },
        { time: "13:30", title: "Mantık Devreleri" },
      ],
    },
    {
      day: "Salı",
      lessons: [
        { time: "09:30", title: "Yazılım Tasarımı" },
        { time: "13:00", title: "Ver Yapıları ve Algoritmalar Lab" },
      ],
    },
    {
      day: "Çarşamba",
      lessons: [
        { time: "11:00", title: "Grafik Arayüz Tasarımı" },
      ],
    },
    {
      day: "Perşembe",
      lessons: [
        { time: "08:30", title: "Yapay Zeka" },
      ],
    },
    {
      day: "Cuma",
      lessons: [
        { time: "09:00", title: "Diferansiyel Denklemler" },
        { time: "11:00", title: "Yapay Zeka" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Başlık kartı */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex justify-center items-center">
          <CalendarDays className="w-8 h-8 text-blue-700" />
          <h1 className="text-4xl font-bold text-blue-900 m-0 ml-3">Haftalık Ders Programı</h1>
        </div>

        {/* Program kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schedule.map((day, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md p-5">
              <h2 className="text-xl font-semibold text-blue-800 mb-4 border-b pb-2">{day.day}</h2>
              <div className="space-y-3">
                {day.lessons.map((lesson, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-blue-100 text-blue-900 px-4 py-2 rounded-lg shadow-sm"
                  >
                    <span className="font-medium">{lesson.title}</span>
                    <span className="text-sm font-semibold">{lesson.time}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
