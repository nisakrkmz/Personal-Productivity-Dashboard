interface BlogCardProps {
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
  link?: string;
  avatar?: string;
}

export default function BlogCard({ title, content, image, author, date, link, avatar }: BlogCardProps) {
  const cardContent = (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl max-w-sm mx-auto flex flex-col z-10 relative cursor-pointer">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-1">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2">{title}</h2>
        <p className="text-gray-700 mb-4 line-clamp-3">{content}</p>
        <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
          <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3 overflow-hidden">
            {avatar ? (
              <img src={avatar} alt={author} className="w-10 h-10 object-cover rounded-full" />
            ) : (
              <span className="text-gray-500 font-semibold text-lg">{author[0]}</span>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{author}</p>
            <p className="text-xs text-gray-400">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      {cardContent}
    </a>
  ) : cardContent;
}
