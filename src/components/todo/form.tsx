import { Box, Button, Group, TextInput } from '@mantine/core';
import { Todo } from '../../types/todo';
import styles from './todo.module.css';
import { useForm } from '@mantine/form';
import { DateTimePicker } from '@mantine/dates';
import { useCallback, useEffect } from 'react';
import { addTodo } from '../../utils/storage';

export const TodoForm = () => {

    const formState = useForm<Pick<Todo, 'title' | 'description' | 'due'>>({
        initialValues: {
            title: '',
            description: '',
            due: 0
        },
        validate: {
            title: (value) => value.trim().length > 0,
            description: (value) => value.trim().length > 0,
            due: (value) => value > Date.now()
        }
    })

    useEffect(() => {
        console.log(formState)
    }, [formState]);


    const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>((e) => {
        e.preventDefault();
        const { title, description, due } = formState.values;
        if (title && description) {

            addTodo({
                title,
                description,
                done: false,
                due,
                id: Math.floor(Math.random() + Date.now())
            });
            formState.reset();
            window.location.reload();
        }
    }, [formState]);


    return <>
        <Box maw={500} mx={'auto'}>
            <form onSubmit={handleSubmit}>
                <TextInput

                    withAsterisk
                    label="Title"
                    {...formState.getInputProps('title')}
                />
                <TextInput
                    withAsterisk
                    label="Description"
                    {...formState.getInputProps('description')}
                />
                <DateTimePicker
                    label="Pick date and time"
                    placeholder="Pick date and time"
                    onChange={(value) => formState.setFieldValue('due', value?.getTime() || 0)}

                />
                <Group justify="flex-end" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
    </>
}