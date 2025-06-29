import React, { createContext, ReactNode, useContext, useState } from 'react';

// define task data structure
export interface Task {
  id: string; // Unique identifier (timestamp-based)
  text: string; // Task description
  completed: boolean; // Completion status
  createdAt: Date;  // Creation timestamp
}

// Define the shape of the context's value
interface ITasksContext {
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

//cCreate context with default undefined value
const TasksContext = createContext<ITasksContext | undefined>(undefined);

// create provider component
export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (text: string) => {
    if (text.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTasks(prevTasks => [newTask, ...prevTasks]);
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};

// create custom hook for easy consumption of the context
export const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};