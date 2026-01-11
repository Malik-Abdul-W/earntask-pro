
import { User, Task, Withdrawal } from './types';

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Watch 2-Minute Video', description: 'Watch the full video to earn points.', category: 'YOUTUBE_WATCH', points: 50, link: 'https://youtube.com', timerSeconds: 120, status: 'ACTIVE' },
  { id: '2', title: 'Subscribe to Tech Channel', description: 'Subscribe and stay updated.', category: 'YOUTUBE_SUB', points: 100, link: 'https://youtube.com', timerSeconds: 15, status: 'ACTIVE' },
  { id: '3', title: 'Follow Facebook Page', description: 'Follow our official partner.', category: 'FACEBOOK_FOLLOW', points: 75, link: 'https://facebook.com', timerSeconds: 10, status: 'ACTIVE' },
  { id: '4', title: 'Follow on TikTok', description: 'Get daily shorts.', category: 'TIKTOK_FOLLOW', points: 80, link: 'https://tiktok.com', timerSeconds: 10, status: 'ACTIVE' },
];

export const getStore = () => {
  const users = JSON.parse(localStorage.getItem('et_users') || '[]');
  const tasks = JSON.parse(localStorage.getItem('et_tasks') || JSON.stringify(INITIAL_TASKS));
  const withdrawals = JSON.parse(localStorage.getItem('et_withdrawals') || '[]');
  const currentUser = JSON.parse(localStorage.getItem('et_current_user') || 'null');
  
  return { users, tasks, withdrawals, currentUser };
};

export const saveUsers = (users: User[]) => localStorage.setItem('et_users', JSON.stringify(users));
export const saveTasks = (tasks: Task[]) => localStorage.setItem('et_tasks', JSON.stringify(tasks));
export const saveWithdrawals = (withdrawals: Withdrawal[]) => localStorage.setItem('et_withdrawals', JSON.stringify(withdrawals));
export const setCurrentUser = (user: User | null) => localStorage.setItem('et_current_user', JSON.stringify(user));

// Quick Helper to sync points
export const syncPoints = (userId: string, pointsChange: number) => {
  const { users, currentUser } = getStore();
  const updatedUsers = users.map((u: User) => {
    if (u.id === userId) {
      const newPoints = u.points + pointsChange;
      if (currentUser && currentUser.id === userId) {
        setCurrentUser({ ...currentUser, points: newPoints });
      }
      return { ...u, points: newPoints };
    }
    return u;
  });
  saveUsers(updatedUsers);
};
