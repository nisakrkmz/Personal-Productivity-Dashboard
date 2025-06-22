import {
  Instagram,
  Globe,
  Mail,
  BookOpen,
  User,
  Phone,
  Target,
  Linkedin,
} from 'lucide-react';

export default function SchoolPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 p-6 bg-blue-100 min-h-screen">
      {/* Başlık */}
      <section className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        <header className="flex flex-col items-center space-y-4 text-center">
          <img
            src="https://samsun.edu.tr/wp-content/uploads/2023/02/siyah-logo.png"
            alt="Okul Logosu"
            className="w-36 rounded-md shadow-md hover:scale-105 transition-transform duration-300"
          />
          <div>
            <div className="text-xl font-bold font-montserrat text-blue-800">
              Yazılım Mühendisliği - 2. Sınıf Öğrencisi
            </div>
            <p className="text-gray-500 mt-1 text-sm">Samsun Üniversitesi</p>
          </div>
        </header>
      </section>

      {/* Kişisel Tanıtım */}
      <section className="bg-blue-50 rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold font-montserrat mb-4 flex items-center space-x-2 text-blue-700">
          <User className="w-6 h-6" />
          <span>Hakkımda</span>
        </h2>
        <p className="text-gray-700 leading-relaxed">
Yazılım Mühendisliği bölümünde 2. sınıfın sonlara gelmiş bir öğrenciyim. Kendimi geliştirmek için çabalıyorum.

Üniversitede öğrendiğim bilgilerle pratik yapmaya, projeler geliştirmeye çalışıyorum. Takım çalışmalarına katılmak ve farklı bakış açıları kazanmak benim için önemli.

Yapay zeka ve veri bilimi ilgimi çeken alanlar. Bu konularda derinleşmek ve yenilikçi projeler yapmak istiyorum.

Yazılım benim için sadece bir meslek değil, aynı zamanda keyif aldığım ve sürekli öğrenmeye açık bir alan.
        </p>
      </section>

      {/* Okul ve Bölüm Bilgileri */}
      <section className="bg-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold font-montserrat flex items-center space-x-2 text-blue-800 mb-3">
          <BookOpen className="w-6 h-6" />
          <span>Okul & Bölüm Bilgileri</span>
        </h2>
        <ul className="text-gray-800 list-disc list-inside space-y-1 pl-2">
          <li><strong>Okul:</strong> Samsun Üniversitesi</li>
          <li><strong>Bölüm:</strong> Yazılım Mühendisliği</li>
          <li><strong>Sınıf:</strong> 2. Sınıf</li>
          <li><strong>Program Türü:</strong> Lisans</li>
        </ul>

        {/* İletişim ve Sosyal Linkler */}
        <div className="flex flex-wrap gap-6 mt-5">
          {[
            {
              icon: <Instagram className="w-5 h-5 text-pink-500" />,
              label: 'Fakülte Instagram Hesabı',
              href: 'https://www.instagram.com/samsun.mf/',
            },
            {
              icon: <Linkedin className="w-5 h-5 text-blue-700" />,
              label: 'Bölüm LinkedIn Hesabı',
              href: 'https://www.linkedin.com/in/yaz%C4%B1l%C4%B1m-m%C3%BChendisli%C4%9Fi-95b197362/',
            },
            {
              icon: <Globe className="w-5 h-5 text-green-600" />,
              label: 'Bölüm Web Sitesi',
              href: 'https://yazilimmuhendisligi.samsun.edu.tr/',
            },
          ].map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-700 hover:underline"
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Kişisel Hedefler */}
      <section className="bg-blue-50 rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold font-montserrat mb-4 flex items-center gap-2 text-blue-700">
          <Target className="w-6 h-6 text-gray-500" />
          <span>Kişisel Hedeflerim</span>
        </h2>
        <ul className="list-disc list-inside text-gray-800 space-y-2 pl-2">
          <li>Yapay zeka ve makine öğrenimi alanında derinlemesine bilgi edinmek.</li>
          <li>Staj ve projelerle gerçek dünya deneyimi kazanmak.</li>
          <li>Mobil ve web uygulamaları geliştirmek ve yaygınlaştırmak.</li>
          <li>Ekip çalışmalarına katkı sağlamak.</li>
        </ul>
      </section>

      <section className="bg-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 italic text-gray-600 text-center">
        <q className="text-lg font-semibold">
          Çalışmaya devam et.
        </q>
      </section>
    </div>
  );
}
