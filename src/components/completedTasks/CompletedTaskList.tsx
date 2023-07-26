import React from 'react';
import styles from '@/components/completedTasks/styles.module.css'
import { BiSolidCheckboxChecked} from 'react-icons/bi'

interface Task {
  id: number;
  name: string;
  finished: boolean;
}

interface CompletedTasksListProps {
  tasks: Task[];
}

const CompletedTasksList: React.FC<CompletedTasksListProps> = ({ tasks }) => {
  
  
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className={styles.container_completed_tasks}>
        <ul className={styles.completed_tasks_list}>
          {tasks.map((task) => (
            <li key={task.id} className={styles.task_completed}>
              <span className={styles.span_icon_checkbox}><BiSolidCheckboxChecked /></span>
              <span className={styles.task_name}>{task.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompletedTasksList;
