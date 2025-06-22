import WelcomeCard from '../components/dashboard/WelcomeCard';
import TaskList from '../components/dashboard/TaskList';
import MotivationQuote from '../components/dashboard/MotivationQuote';
import UpcomingExams from '../components/dashboard/UpcomingExams';

export default function Dashboard() {
  return (
    <div className="space-y-8 p-6 bg-blue-100 min-h-screen">
      
      {/* Welcome Card */}
      <div className="max-w-4xl mx-auto">
        <WelcomeCard />
      </div>

      {/* Tasks and Motivation Quote Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <TaskList />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center">
          <MotivationQuote />
        </div>
      </div>

      {/* Upcoming Exams Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <UpcomingExams />
      </div>

    </div>
  );
}
