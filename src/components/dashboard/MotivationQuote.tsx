import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const motivationQuotes = [
  {
    text: "Başarı, her gün tekrarlanan küçük çabaların toplamıdır.",
    author: "Robert Collier"
  },
  {
    text: "Bugün yapabileceğini yarına bırakma.",
    author: "Benjamin Franklin"
  },
  {
    text: "O halde önemli bir işi bitirince hemen diğerine koyul.Ve yalnız rabbine yönel.",
    author: " İnşirah,94 /7-8"
  },
  {
    text: "Bir yandan korkun bir yandan umudun varsa iki kanatlı olursun; tek kanatla uçulmaz zaten.",
    author: "Mevlana Celaleddin Rumi"
  },
  {
    text: "Muhakkak her zorlukla beraber bir kolaylık vardır.",
    author: " İnşirah,94 /5"
  }
];

export default function MotivationQuote() {
  const [quote, setQuote] = useState(() => {
    return motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)];
  });

  const getNewQuote = () => {
    const newQuote = motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)];
    setQuote(newQuote);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Günün Motivasyonu</h3>
        

        <button 
  onClick={getNewQuote}
  className="p-2 !bg-blue-300 !text-blue-900 hover:!bg-blue-400 rounded-full transition-colors shadow"
  title="Yeni alıntı getir"
>

          <RefreshCw className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <div>
        <p className="text-gray-700 italic mb-2">"{quote.text}"</p>
        <p className="text-gray-500 text-sm">- {quote.author}</p>
      </div>
    </div>
  );
} 