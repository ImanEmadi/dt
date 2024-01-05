import { Box } from '@mantine/core';
import styles from './todo.module.css';
import { useCallback, useEffect, useState } from 'react';
import { Todo } from '../../types/todo';
import { deleteTodo, markAsDone, readTodos } from '../../utils/storage';


export const TodoList = () => {

    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(() => {
        setTodos(readTodos());
    }, []);

    const handleDelete = useCallback((id: number) => {
        setTodos(deleteTodo(id))
    }, []);

    const handleMarkDone = useCallback((id: number) => {
        setTodos(markAsDone(id))
    }, [])

    return <>
        <Box maw={700} mx={'auto'}>
            <ul className={styles.todoList}>
                {todos.length === 0 && (
                    <p className={styles.notodo}>No TODO to display!</p>
                )}
                {todos.map((todo, inx) => {
                    return <li key={inx}>
                        <h3>{todo.title}</h3>
                        {todo.due < Date.now() ? <p className={styles.expired}>
                            Todo Expired!
                        </p> : <>
                            {todo.done ? <p className={styles.done}>Done!</p> :
                                <p className={styles.active}>Yet to be done!</p>}
                        </>}
                        <p>{todo.description}</p>
                        <p>Due at : {(new Date(todo.due)).toString()}</p>
                        <button className={styles.delBtn}
                            onClick={() => handleDelete(todo.id)}>Delete</button>
                        <button
                            className={styles.doneBtn}
                            onClick={() => handleMarkDone(todo.id)}
                        >Mark as Done</button>
                    </li>
                })}
            </ul>
        </Box>
    </>;
}