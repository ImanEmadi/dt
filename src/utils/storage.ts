import { Todo } from "../types/todo"


export const addTodo = (todo: Todo) => {
    const todos = window.localStorage.getItem('todos');
    try {
        const todo_arr = JSON.parse(todos || '[]');
        todo_arr.push(todo);
        window.localStorage.setItem('todos', JSON.stringify(todo_arr));
        if (!Array.isArray(todo_arr)) throw new Error('not parsed as array');
    } catch (error) {
        console.error(error);
        window.localStorage.setItem('todos', JSON.stringify([todo]));
    }
}


export const readTodos = (): Todo[] => {
    try {
        const todos = JSON.parse(window.localStorage.getItem('todos') || '[]');
        if (!todos || !Array.isArray(todos)) throw new Error('not parsed as array');
        return todos as Todo[];
    } catch (error) {
        console.error(error);
        return [];
    }
}


export const deleteTodo = (id: number) => {
    const todos = readTodos();
    const newTodos = todos.filter(todo => todo.id !== id);
    window.localStorage.setItem('todos', JSON.stringify(newTodos));
    return readTodos();
}

export const editTodo = (todo: Todo) => {
    const todos = readTodos();
    const newTodos = todos.map(t => t.id === todo.id ? todo : t);
    window.localStorage.setItem('todos', JSON.stringify(newTodos));
    return readTodos();
}

export const markAsDone = (id: number) => {
    const todos = readTodos();
    const newTodos = todos.map(t => t.id === id ? { ...t, done: true } : t);
    window.localStorage.setItem('todos', JSON.stringify(newTodos));
    return readTodos();
}