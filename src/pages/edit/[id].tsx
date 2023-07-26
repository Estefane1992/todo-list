import styles from '@/styles/syles.module.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTaskContext } from '@/components/taskContext/TaskContext';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { BsChevronLeft} from 'react-icons/bs';
import Link from 'next/link';

const Editar: React.FC = () => {
  const router = useRouter();
  const { tasks, editTask } = useTaskContext();
  const [task, setTask] = useState({ id: 0, name: '', finished: false });
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const taskId = Number(router.query.id);
    const selectedTask = tasks.find((task) => task.id === taskId);

    if (selectedTask) {
      setTask(selectedTask);
    }
  }, [router.query.id, tasks]);

  const handleEditTask = () => {
    editTask(task.id, task.name); 
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false); 
      router.push('/'); 
    }, 2000);
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
  <div>
    <div className="mt-5">
      <div>
      <BsChevronLeft className={styles.icon_edit_page} />
      <Link href="/" className={styles.edit_page_link}>
        <span>Edit<br /><span className={styles.span_task}>Task</span></span>
      </Link>
      </div>
    </div>
  </div>
  <Row xs={12} className="text-center my-4">
    <Col>
      <Form>
        <Form.Label className={styles.form_label}>Task title</Form.Label>
        <div className={styles.task_container}>
          <Form.Control
            className={`form-control m-auto p-3 ${styles.input_text}`}
            placeholder={task.name}
            type="text"
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
          />
    
        </div>
        <div className={styles.button_container_edit_task}>
          <Button className={styles.edit_task_button} onClick={handleEditTask}>Edit task</Button>
        </div>
      </Form>
    </Col>
  </Row>
  {showMessage && (
    <div className={`alert alert-success ${styles.success_message}`} role="alert">
      Task successfully edited!
    </div>
  )}
</Container>
  );
};

export default Editar;
