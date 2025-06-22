import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';

interface Todo {
  title: string;
  completed: boolean;
  category?: string;
}

interface TodoFormProps {
  onSubmit: (todo: Todo) => void;
}

interface TodoFormData {
  title: string;
  category: string;
}

export default function TodoForm({ onSubmit }: TodoFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TodoFormData>();

  const onFormSubmit = (data: TodoFormData) => {
    onSubmit({
      title: data.title.trim(),
      completed: false,
      category: data.category.trim() || undefined,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="bg-white rounded-lg shadow p-4">
      <div className="flex space-x-4">
        <div className="flex-1">
          <input
            {...register('title', { required: 'Görev başlığı zorunludur' })}
            placeholder="Yeni görev ekle..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>
        <div className="w-48">
          <input
            {...register('category')}
            placeholder="Kategori (opsiyonel)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
  type="submit"
  className="px-4 py-2 text-blue-900 rounded-lg hover:bg-blue-400 flex items-center shadow transition-colors duration-200"
  style={{ backgroundColor: '#93c5fd' }} // Tailwind'deki bg-blue-300 hex kodu
>
  <Plus className="w-5 h-5 mr-1" />
  Ekle
</button>



      </div>
    </form>
  );
} 