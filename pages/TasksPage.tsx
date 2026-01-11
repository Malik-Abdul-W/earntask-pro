
import React, { useState, useEffect } from 'react';
import { User, Task, TaskCategory } from '../types';
import { getStore, syncPoints, saveUsers } from '../store';

interface TasksPageProps {
  user: User;
}

const TasksPage: React.FC<TasksPageProps> = ({ user: initialUser }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [timer, setTimer] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialUser);

  useEffect(() => {
    // SEO Optimization
    document.title = "Available Earning Tasks - Earn Points Daily | EarnTask Pro";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Browse through hundreds of available social media tasks. Watch YouTube videos, follow Facebook pages and more to earn points and get paid.");
    }

    const { tasks: storeTasks, currentUser: sUser } = getStore();
    setTasks(storeTasks.filter((t: Task) => t.status === 'ACTIVE'));
    setCurrentUser(sUser);
  }, []);

  const handleStartTask = (task: Task) => {
    window.open(task.link, '_blank');
    setActiveTask(task);
    setTimer(task.timerSeconds);
    setIsVerifying(true);
  };

  useEffect(() => {
    let interval: any;
    if (isVerifying && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0 && isVerifying) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isVerifying, timer]);

  const handleConfirmTask = () => {
    if (!activeTask) return;

    const { users } = getStore();
    const updatedUsers = users.map((u: User) => {
      if (u.id === currentUser.id) {
        const updatedUser = {
          ...u,
          points: u.points + activeTask.points,
          completedTasks: [
            ...u.completedTasks, 
            { taskId: activeTask.id, completedAt: new Date().toISOString() }
          ]
        };
        setCurrentUser(updatedUser);
        return updatedUser;
      }
      return u;
    });
    
    saveUsers(updatedUsers);
    syncPoints(currentUser.id, activeTask.points);
    
    alert(`Successfully completed! You earned ${activeTask.points} points.`);
    setActiveTask(null);
    setIsVerifying(false);
  };

  const getCategoryIcon = (cat: TaskCategory) => {
    switch(cat) {
      case 'YOUTUBE_WATCH':
      case 'YOUTUBE_SUB': return 'fa-youtube text-red-600';
      case 'FACEBOOK_FOLLOW': return 'fa-facebook text-blue-600';
      case 'TIKTOK_FOLLOW': return 'fa-tiktok text-slate-900';
      case 'INSTAGRAM_LIKE': return 'fa-instagram text-pink-600';
      default: return 'fa-tasks text-indigo-600';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Available Tasks</h1>
        <p className="text-slate-500">Complete these tasks carefully to earn points. Do not unfollow or unsubscribe after earning, or your points will be revoked.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tasks.map(task => {
          const isCompleted = currentUser.completedTasks.some(ct => ct.taskId === task.id);
          return (
            <div key={task.id} className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between ${isCompleted ? 'opacity-60 grayscale' : ''}`}>
              <div>
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
                        <i className={`fab ${getCategoryIcon(task.category)}`}></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800">{task.title}</h3>
                        <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{task.category.replace('_', ' ')}</span>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-indigo-600 font-bold text-lg">{task.points}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Points</div>
                   </div>
                </div>
                <p className="text-sm text-slate-500 mb-6">{task.description}</p>
              </div>

              {isCompleted ? (
                <button disabled className="w-full bg-emerald-100 text-emerald-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                   <i className="fas fa-check-circle"></i> Completed
                </button>
              ) : (
                <button 
                  onClick={() => handleStartTask(task)}
                  className="w-full bg-slate-50 text-slate-800 border border-slate-200 py-3 rounded-xl font-bold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition"
                >
                  Start Task
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Task Modal Overlay */}
      {activeTask && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
           <div className="bg-white rounded-3xl p-8 max-md:w-full max-w-md text-center shadow-2xl animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                 {timer > 0 ? (
                   <span className="font-bold">{timer}s</span>
                 ) : (
                   <i className="fas fa-check animate-bounce"></i>
                 )}
              </div>
              <h2 className="text-2xl font-bold mb-2">Verifying Task</h2>
              <p className="text-slate-500 mb-8">
                {timer > 0 
                  ? "Please stay on the task page until the timer ends. Do not close this window."
                  : "Verification complete! You can now claim your points."}
              </p>
              
              <div className="flex flex-col gap-3">
                 {timer === 0 ? (
                   <button 
                     onClick={handleConfirmTask}
                     className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-200"
                   >
                     Claim {activeTask.points} Points
                   </button>
                 ) : (
                    <button 
                      disabled
                      className="w-full bg-slate-100 text-slate-400 py-4 rounded-xl font-bold cursor-not-allowed"
                    >
                      Waiting... ({timer}s)
                    </button>
                 )}
                 <button 
                   onClick={() => setActiveTask(null)}
                   className="w-full bg-white text-slate-500 py-2 rounded-xl font-medium hover:bg-slate-50"
                 >
                   Cancel Task
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
