import { useEffect, useState } from 'react';
import BlogCard from '../components/blog/BlogCard';
import { NotebookPen, CalendarDays } from 'lucide-react';

function extractImageFromDescription(description: string): string | null {
  const match = description.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
}

function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function extractCleanSummary(description: string, title: string): string {
  // 1. HTML ve <img> temizliği
  let text = description
    .replace(/<img[^>]*>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // 2. İstenmeyen ifadeleri temizle
  const unwantedPatterns = [
    /(foto|photo|image|resim) by [^.!?\n\r]*/gi,
    /Leonardo[^.!?\n\r]*/gi,
    /nardo AI[^.!?\n\r]*/gi,
    /AI by [^.!?\n\r]*/gi,
  ];
  unwantedPatterns.forEach((pattern) => {
    text = text.replace(pattern, '');
  });

  // 3. Başlık benzeri satırları çıkar
  const titleLower = title.toLowerCase().replace(/[^a-z0-9çğıöşü\s]/gi, '');
  const titleWords = titleLower.split(/\s+/).filter(word => word.length > 2);

  const sentences = text.split(/(?<=[.!?])\s+/);
  const filtered = sentences.filter(sentence => {
    const lower = sentence.toLowerCase();
    const matchCount = titleWords.filter(word => lower.includes(word)).length;
    return matchCount < Math.floor(titleWords.length * 0.6); // %60 benzerse çıkar
  });

  let summary = filtered.slice(0, 2).join(' ').trim();
  summary = summary || text.slice(0, 200) + '...';
  summary = summary.replace(/^[^a-zA-Z0-9çğıöşüİĞÜŞÖÇ]+/, ''); // Başındaki nokta, boşluk vs. sil
  summary = capitalizeFirst(summary);

  return summary;
}


interface BlogForm {
  title: string;
  content: string;
}

const blogImages = [
  '/src/assets/Leonardo_Phoenix_10_A_sleek_modern_hightech_computer_screen_di_3.jpg',
  '/src/assets/Leonardo_Phoenix_10_A_modern_laptop_computer_screen_displaying_3.jpg',
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [userBlogs, setUserBlogs] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<BlogForm>({ title: '', content: '' });
  const [formError, setFormError] = useState('');
  const [selectedUserBlog, setSelectedUserBlog] = useState<any | null>(null);
  const [editForm, setEditForm] = useState<BlogForm>({ title: '', content: '' });
  const [editError, setEditError] = useState('');

  useEffect(() => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@nisanaz')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.items || []);
      });
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      setFormError('Başlık ve içerik zorunlu!');
      return;
    }
    const randomImage = blogImages[Math.floor(Math.random() * blogImages.length)];
    setUserBlogs([
      {
        title: form.title,
        content: form.content,
        image: randomImage,
        author: 'Nisa Naz KORKMAZ',
        date: new Date().toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      },
      ...userBlogs,
    ]);
    setForm({ title: '', content: '' });
    setModalOpen(false);
  };

  // Kendi blog kartına tıklayınca detay/düzenleme modalı aç
  const handleUserBlogClick = (blog: any) => {
    setSelectedUserBlog(blog);
    setEditForm({ title: blog.title, content: blog.content });
    setEditError('');
  };

  // Düzenleme kaydet
  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.title.trim() || !editForm.content.trim()) {
      setEditError('Başlık ve içerik zorunlu!');
      return;
    }
    setUserBlogs(userBlogs.map(b =>
      b === selectedUserBlog
        ? { ...b, title: editForm.title, content: editForm.content }
        : b
    ));
    setSelectedUserBlog(null);
  };

  // Blog sil
  const handleDeleteUserBlog = () => {
    setUserBlogs(userBlogs.filter(b => b !== selectedUserBlog));
    setSelectedUserBlog(null);
  };

  return (
    <div className="space-y-8 w-full max-w-3xl mx-auto p-6 bg-blue-100 min-h-screen relative">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex items-center justify-center gap-3">
        <NotebookPen className="w-8 h-8 text-blue-700" />
        <h1 className="text-3xl font-bold text-blue-700 m-0">Blog Yazıları</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userBlogs.map((post, idx) => (
          <div key={'user-' + idx} onClick={() => handleUserBlogClick(post)} style={{ cursor: 'pointer' }}>
            <BlogCard
              title={post.title}
              content={post.content}
              image={post.image}
              author={post.author}
              date={post.date}
            />
          </div>
        ))}
        {blogs.map((post, idx) => (
          <BlogCard
            key={idx}
            title={post.title}
            content={extractCleanSummary(post.description, post.title)}
            image={
              post.thumbnail ||
              extractImageFromDescription(post.description) ||
              'https://source.unsplash.com/random/400x300?blog'
            }
            author={post.author}
            date={new Date(post.pubDate).toLocaleDateString('tr-TR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
            link={post.link}
          />
        ))}
      </div>

      {/* + Blog Ekle butonu */}
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-8 right-8 rounded-full w-16 h-16 flex items-center justify-center shadow-lg text-3xl z-50 transition-all"
        style={{
          backgroundColor: '#60a5fa',
          background: '#60a5fa !important',
          color: 'white !important',
        }}
        title="Blog Ekle"
      >
        +
      </button>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl border border-gray-200 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full shadow transition-colors"
              style={{ backgroundColor: '#000', border: 'none' }}
              aria-label="Kapat"
            >
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.5rem', lineHeight: 1 }}>×</span>
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Yeni Blog Yazısı Ekle</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  className="w-full border rounded p-2"
                  placeholder="Yazı başlığı girin..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">İçerik</label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleFormChange}
                  rows={4}
                  className="w-full border rounded p-2"
                  placeholder="Yazının içeriği..."
                  required
                />
              </div>
              {formError && <div className="text-red-500 text-sm">{formError}</div>}
              <button
                type="submit"
                className="w-full px-4 py-2 text-white rounded-lg"
                style={{ backgroundColor: '#000', color: '#fff' }}
              >
                Ekle
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Kendi blogunu görüntüle/düzenle modalı */}
      {selectedUserBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl border border-gray-200 relative">
            <button
              onClick={() => setSelectedUserBlog(null)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full shadow transition-colors"
              style={{ backgroundColor: '#000', border: 'none' }}
              aria-label="Kapat"
            >
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.5rem', lineHeight: 1 }}>×</span>
            </button>
            <img src={selectedUserBlog.image} alt={selectedUserBlog.title} className="w-full h-48 object-cover rounded-xl mb-4" />
            <form onSubmit={handleEditSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">İçerik</label>
                <textarea
                  name="content"
                  value={editForm.content}
                  onChange={e => setEditForm(f => ({ ...f, content: e.target.value }))}
                  rows={4}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              {editError && <div className="text-red-500 text-sm">{editError}</div>}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleDeleteUserBlog}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors w-1/2"
                >
                  Sil
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-black text-white font-semibold w-1/2"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}



