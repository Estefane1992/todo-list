import React from 'react';
import { useLocalStorage } from '../hook/useLocalStorage';


export interface Task {
  id: number;
  name: string;
  finished: boolean;
}

interface TaskContextData {
  tasks: Task[];
  addTask: (name: string) => void;
  toggleTask: (index: number) => void;
  deleteTask: (index: number) => void;
}

const TaskContext = React.createContext<TaskContextData>({} as TaskContextData);

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);

  const addTask = (name: string) => {
    const newTask: Task = { id: Date.now(), name, finished: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].finished = !updatedTasks[index].finished;
    setTasks(updatedTasks);
  };

  const deleteTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export function useTaskContext() {
  const context = React.useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}
