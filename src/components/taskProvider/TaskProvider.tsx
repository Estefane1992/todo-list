import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';

export interface Task {
  id: number;
  name: string;
  finished: boolean;
}

interface TaskContextData {
  tasks: Task[];
  completedTasks: Task[];
  addTask: (name: string) => void;
  toggleTask: (index: number) => void;
  deleteTask: (index: number) => void;
  editTask: (id: number, newName: string) => void;
  completeTask: (index: number) => void;
  getCompletedTasks: () => Task[];
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Briefing with Lokanaka', finished: false },
    { id: 2, name: 'Pitching with John', finished: false },
    { id: 3, name: 'Design Landing Page', finished: false },
  ]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([
    { id: 4, name: 'Wake Up!', finished: true },
    { id: 5, name: 'Daily workout', finished: true },
  ]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }

    const storedCompletedTasks = localStorage.getItem('completedTasks');
    if (storedCompletedTasks) {
      setCompletedTasks(JSON.parse(storedCompletedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const addTask = (name: string) => {
    const newTask: Task = {
      id: Math.random(),
      name,
      finished: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (index: number) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, finished: !task.finished };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (id: number, newName: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const completeTask = (index: number) => {
    const completedTask = tasks[index];
    setTasks([...tasks.slice(0, index), ...tasks.slice(index + 1)]);
    setCompletedTasks([...completedTasks, completedTask]);
  };

  const getCompletedTasks = () => {
    return completedTasks;
  };

  return (
    <TaskContext.Provider value={{ tasks, completedTasks, addTask, toggleTask, deleteTask, editTask, completeTask, getCompletedTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

const useTaskContext = () => useContext(TaskContext);

export { TaskProvider, useTaskContext };
