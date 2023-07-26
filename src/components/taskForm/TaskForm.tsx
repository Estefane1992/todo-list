import React, { useState } from 'react';
import styles from '@/components/taskForm/styles.module.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { BsChevronLeft } from 'react-icons/bs';
import Link from 'next/link';
import { icons } from 'react-icons/lib';

interface TaskFormProps {
  onSave: (task: string) => void;
}
export interface TaskItem { 
  text: string;
  finished: boolean;
}
const TaskForm: React.FC<TaskFormProps> = ({ onSave }) => {
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newTask.trim() === '') {
      setError(true);
    } else {
      onSave(newTask);
      setNewTask('');
      setError(false);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
    <div >
      <div >
        <div>
          <BsChevronLeft className={styles.chevron_icon} />
          <Link href="/" className={styles.top_titulo}>
            <span>Create <br/> <span className={styles.top_titulo_span}>Task</span></span>
          </Link>
        </div>
      </div>
    </div>
    <Row>
    <Col className="text-center my-4">
  <div className={styles.formContainer}>
    <Form onSubmit={handleSubmit} className="add">
      <Form.Label className={styles.form_label}>Task title</Form.Label>
      <div className={styles.form_control_with_icon}>
        <Form.Control
          className={`form-control m-auto p-3 ${styles.form_control}`}
          type="text"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
            setError(false);
          }}
          placeholder="Type here"
        />
      </div>
    
      <div className={styles.container_button}>
        <Button
          type="submit"
          className={`btn mt-3 ${styles.button_task}`}
          disabled={newTask.trim() === ''}
        >
          Create task
        </Button>
      </div>
    </Form>
  </div>
</Col>
    </Row>
  </Container>
  );
};

export default TaskForm;
