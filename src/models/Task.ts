export type Task = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  dueDate?: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  tags?: string[];
};
