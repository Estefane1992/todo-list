import React, { useState } from 'react';
import {BsTrash, BsPencil } from 'react-icons/bs';
import styles from '@/components/taskList/styles.module.css';
import { useTaskContext, Task } from '@/components/taskContext/TaskContext';
import { useRouter } from 'next/router';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (index: number) => void;
  onDeleteTask: (index: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask }) => {
  const { completeTask } = useTaskContext();
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  const handleCompleteTask = (index: number) => {
    completeTask(index);
    setShowDeleteSuccess(true);

    setTimeout(() => {
      setShowDeleteSuccess(false);
    }, 3000);
  };

  const handleDeleteTask = (index: number) => {
    onDeleteTask(index);
    setShowDeleteMessage(true);

    setTimeout(() => {
      setShowDeleteMessage(false);
    }, 3000);
  };

  const router = useRouter();

  const handleEditTask = (index: number) => {
    const taskId = tasks[index].id;
    router.push(`/edit/${taskId}`);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      {tasks.length > 0 && (
        <div className={ styles.container_task_list}>
          <ul className={`list-group ${styles.task_list}`}>
            {tasks.map((task, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div className={`d-flex align-items-center ${styles['task-item']}`} onClick={() => onToggleTask(index)}>
                  <input className={styles.input_checkbox} type="checkbox" checked={task.finished} onChange={() => handleCompleteTask(index)} />
                  <span className={`ms-2 ${styles.task_text} ${task.finished ? 'text-decoration-line-through' : ''}`}>{task.name}</span>
                </div>
                <div>
                  <button className={`btn me-2 ${styles.buttons}`} onClick={() => handleEditTask(index)}>
                    <BsPencil />
                  </button>
                  <button className={`btn me-2 ${styles.buttons}`} onClick={() => handleDeleteTask(index)}>
                    <BsTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showDeleteSuccess && (
        <div className="alert alert-success position-fixed top-0 start-50 translate-middle-x" role="alert">
          Task completed successfully!
        </div>
      )}

      {showDeleteMessage && (
        <div className="alert alert-danger position-fixed top-0 start-50 translate-middle-x" role="alert">
          Task deleted successfully!
        </div>
      )}
    </div>
  );
};

export default TaskList;
