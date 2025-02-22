export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  category?: 'personal' | 'work' | 'research' | 'other';
  color?: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  createdAt: string;
  dueDate?: string;
  assignedTo?: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: string;
}