
import React, { useState, useEffect } from 'react';
import { Task, TaskCategory } from '../types';
import { getStore, saveTasks } from '../store';

const AdminTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    category: 'YOUTUBE_WATCH',
    points: 10,
    timerSeconds: 30,
    status: 'ACTIVE'
  });

  useEffect(() => {
    const { tasks: storeTasks } = getStore();
    setTasks(storeTasks);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      const updated = tasks.filter(t => t.id !== id);
      setTasks(updated);
      saveTasks(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const taskToAdd: Task = {
      ...newTask as Task,
      id: Date.now().toString()
    };
    const updated = [...tasks, taskToAdd];
    setTasks(updated);
    saveTasks(updated);
    setShowModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-bold text-slate-900">Manage Tasks</h1>
           <p className="text-slate-500">Create, edit, or remove earning tasks for users.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100"
        >
          Add New Task
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
               <thead>
                  <tr className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                     <th className="px-6 py-4">Task Info</th>
                     <th className="px-6 py-4">Points</th>
                     <th className="px-6 py-4">Platform</th>
                     <th className="px-6 py-4">Timer</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {tasks.map(task => (
                    <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                       <td className="px-6 py-4">
                          <div className="font-bold text-slate-800">{task.title}</div>
                          <div className="text-xs text-slate-400 truncate max-w-[200px]">{task.link}</div>
                       </td>
                       <td className="px-6 py-4 font-bold text-indigo-600">{task.points} pts</td>
                       <td className="px-6 py-4">
                          <span className="bg-slate-100 px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-600 uppercase">
                             {task.category.replace('_', ' ')}
                          </span>
                       </td>
                       <td className="px-6 py-4 font-medium text-slate-500">{task.timerSeconds}s</td>
                       <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${task.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                             {task.status}
                          </span>
                       </td>
                       <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => handleDelete(task.id)} className="text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
           <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl">
              <h2 className="text-2xl font-bold mb-6">Create New Task</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <label className="block text-sm font-semibold mb-1">Title</label>
                    <input required type="text" className="w-full px-4 py-2 border rounded-lg" onChange={e => setNewTask({...newTask, title: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-sm font-semibold mb-1">Description</label>
                    <textarea required className="w-full px-4 py-2 border rounded-lg" onChange={e => setNewTask({...newTask, description: e.target.value})} />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-sm font-semibold mb-1">Category</label>
                       <select className="w-full px-4 py-2 border rounded-lg" onChange={e => setNewTask({...newTask, category: e.target.value as TaskCategory})}>
                          <option value="YOUTUBE_WATCH">YouTube Watch</option>
                          <option value="YOUTUBE_SUB">YouTube Subscribe</option>
                          <option value="FACEBOOK_FOLLOW">Facebook Follow</option>
                          <option value="TIKTOK_FOLLOW">TikTok Follow</option>
                          <option value="INSTAGRAM_LIKE">Instagram Like</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-sm font-semibold mb-1">Points</label>
                       <input required type="number" className="w-full px-4 py-2 border rounded-lg" defaultValue={10} onChange={e => setNewTask({...newTask, points: Number(e.target.value)})} />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-sm font-semibold mb-1">Timer (Seconds)</label>
                       <input required type="number" className="w-full px-4 py-2 border rounded-lg" defaultValue={30} onChange={e => setNewTask({...newTask, timerSeconds: Number(e.target.value)})} />
                    </div>
                    <div>
                       <label className="block text-sm font-semibold mb-1">Status</label>
                       <select className="w-full px-4 py-2 border rounded-lg" onChange={e => setNewTask({...newTask, status: e.target.value as any})}>
                          <option value="ACTIVE">Active</option>
                          <option value="INACTIVE">Inactive</option>
                       </select>
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-semibold mb-1">Link URL</label>
                    <input required type="url" className="w-full px-4 py-2 border rounded-lg" placeholder="https://..." onChange={e => setNewTask({...newTask, link: e.target.value})} />
                 </div>
                 <div className="flex gap-3 pt-4">
                    <button type="submit" className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl">Create Task</button>
                    <button type="button" onClick={() => setShowModal(false)} className="px-6 text-slate-500 font-bold">Cancel</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminTasks;
