
import { TodoForm } from './form';
import { TodoList } from './list';
import styles from './todo.module.css';

export const Todo = () => {
    return <>
        <section className={styles.wrapper}>
            <TodoForm />
            <TodoList />
        </section>
    </>
}