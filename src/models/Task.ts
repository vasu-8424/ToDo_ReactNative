export type Task = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  deadline: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
};
