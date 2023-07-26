import React from 'react';
import { useRouter } from 'next/router';
import { useTaskContext } from '@/components/taskContext/TaskContext';
import TaskForm from '@/components/taskForm/TaskForm';
import styles from '@/styles/syles.module.css';

const AddPage: React.FC = () => {
  const router = useRouter();
  const { addTask } = useTaskContext();

  const handleSaveTask = (newTask: string) => {
    addTask(newTask);
    router.push('/');
  };

  return (
    <div className={styles.container_task_from}>
      <div>
        <TaskForm onSave={handleSaveTask} />
      </div>
    </div>
  );
};

export default AddPage;
