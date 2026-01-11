
export type UserRole = 'USER' | 'ADMIN';

export interface CompletedTask {
  taskId: string;
  completedAt: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  role: UserRole;
  points: number;
  completedTasks: CompletedTask[];
  referralCode: string;
  referralCount: number;
  referredBy?: string;
  createdAt: string;
}

export type TaskCategory = 'YOUTUBE_WATCH' | 'YOUTUBE_SUB' | 'FACEBOOK_FOLLOW' | 'TIKTOK_FOLLOW' | 'INSTAGRAM_LIKE' | 'OTHER';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  points: number;
  link: string;
  timerSeconds: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Withdrawal {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  pointsRedeemed: number;
  method: 'EasyPaisa' | 'JazzCash' | 'Bank Transfer';
  accountDetails: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestedAt: string;
}

export interface SiteAnalytics {
  totalUsers: number;
  totalTaskCompletions: number;
  totalPayouts: number;
  activeTasks: number;
}
