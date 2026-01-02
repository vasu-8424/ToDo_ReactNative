import React, { createContext, useState } from 'react';
import { Task } from '../models/Task';
import Toast from 'react-native-toast-message';

export const TaskContext = createContext<any>(null);

export const TaskProvider: React.FC<any> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
    Toast.show({
      type: 'success',
      text1: 'Task Added!',
      text2: `"${task.title}" has been added successfully`,
      position: 'top',
      visibilityTime: 2500,
    });
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find(t => t.id === id);
    setTasks(prev => prev.filter(t => t.id !== id));
    Toast.show({
      type: 'info',
      text1: 'Task Deleted',
      text2: `"${taskToDelete?.title}" has been removed`,
      position: 'top',
      visibilityTime: 2000,
    });
  };

  const toggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
    
    if (task) {
      Toast.show({
        type: 'success',
        text1: task.completed ? 'Task Uncompleted' : 'Task Completed!',
        text2: task.completed 
          ? `"${task.title}" marked as incomplete` 
          : `Great job! "${task.title}" completed! 🎉`,
        position: 'top',
        visibilityTime: 2000,
      });
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};
